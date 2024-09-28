import rates from './conversions.json' with { type: "json" };


interface FloatRatesResponse {
  [currency: string]: {
    alphaCode?: string;
    date?: string;
    code?: string;
    rate: number;
    inverseRate?: number;
    name: string;
    numericCode?: string;
  };
}



async function updateRates(){

  //! Only run this file directly to update the rates in the assets folder

  console.log("%cThis snippet need network and filesystem permissions to update the rates, run it like this: %c`deno --allow-net=www.floatrates.com --allow-write=\"assets/conversions.json\" assets/conversions.ts`", "color: green","color: gray");
  console.log('Updating rates...');

  const floatRates: FloatRatesResponse = await (await fetch('https://www.floatrates.com/daily/usd.json')).json();
  
  
  // Remove unnecessary fields
  // for (let CODE in floatRates) {
  //     delete floatRates[CODE].code;
  //     delete floatRates[CODE].inverseRate;
  //     delete floatRates[CODE].alphaCode;
  //     delete floatRates[CODE].date;
  //     delete floatRates[CODE].numericCode;
  // }

  let newRates = Object.fromEntries(
    Object.entries(floatRates).map(([key, value]) => [key.toUpperCase(), { rate: value.rate, name: value.name }])
  );

  await Deno.writeTextFile('assets/conversions.json', JSON.stringify(newRates, null, 2));
  
  console.log('Rates succesfully updated as '+new Date().toISOString());
}

updateRates();