const API_URL = "https://restcountries.com/v3.1/all";

export let Lista = [];

export const Api = async () => {
     // let Lista = [];
     const response = await fetch(API_URL);
     await response.json().then((countriesRaw) => {
          // console.log(countriesRaw[0]);
          Lista = countriesRaw.map((country) => {
               return {
                    capital: country.capital && country.capital[0],
                    population: country.population.toLocaleString(),
                    name: country.name.common,
                    code: country.cioc,
                    codes: country.cca3,
                    region: country.region,
                    flagUrl: country.flags.png,
                    nativeName: country.name.nativeName , //Object.values(country.name.nativeName)[0].official,
                    subregion: country.subregion,
                    currencies: country.currencies , //Object.values(country.currencies).map((currency) => currency.name).join(", "),
                    languages: country.languages, //Object.values().join(", "),
                    tld: country.tld,
                    borders: country.borders,
                };
          });

          
     });
     return Lista;
}