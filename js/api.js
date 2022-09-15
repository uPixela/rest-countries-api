const API_URL = "https://restcountries.com/v3.1/all";
import { Get , Set } from './storage.js';

export let Data = [];

export const Api = async () => {
     try{
          if(Get('Data') !== null){
               Data = Get('Data');
               return Data;
          }

          const response = await fetch(API_URL);
          await response.json().then((countriesRaw) => {
               Data = countriesRaw.map((country) => {
                    return {
                         capital: country.capital && country.capital[0],
                         population: country.population.toLocaleString(),
                         name: country.name.common,
                         code: country.cioc,
                         codes: country.cca3,
                         region: country.region,
                         flagUrl: country.flags.png,
                         nativeName: country.name.nativeName,
                         subregion: country.subregion,
                         currencies: country.currencies ,
                         languages: country.languages,
                         tld: country.tld,
                         borders: country.borders,
                    };
               });
               Set('Data',Data,86400000);
          });
          return Data;
     }catch(e){
          console.error("Api Not Working");
     }
}