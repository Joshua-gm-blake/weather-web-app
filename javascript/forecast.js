export default class Forecast{
    #cityBase;
    #weatherBase;
    #key;
    #forecastBase;
    constructor(){
        this.#key = "TFJCi9ow0WtWBGA9HW8qFtL6ADrYv0oA";
        this.#cityBase = "https://dataservice.accuweather.com/locations/v1/cities/search";
        this.#weatherBase = "https://dataservice.accuweather.com/currentconditions/v1/";
        this.#forecastBase = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
    }

    async fetchData(cityName){
        const cityData = await this.getCity(cityName);
        const weatherData = await this.getWeather(cityData.Key);
        const forecastData = await this.getForecast(cityData.Key);
        return {cityData, weatherData, forecastData};
    }
    
    async getCity(cityName){
        const query = `?apikey=${this.#key}&q=${cityName}`;
        const response = await fetch(this.#cityBase + query);
        let data = await response.json();
        data = data.filter(d => d.Country.EnglishName === "Jamaica");

        if(data.length)
            return data[0];
        else
            throw new Error("Not a city/town name.");
    }

    async getWeather(cityKey){
        const query = `${cityKey}?apikey=${this.#key}`;
        const response = await fetch(this.#weatherBase + query);
        const data = await response.json();
        return data[0];
    }

    async getForecast(cityKey){
        const query = `${cityKey}?apikey=${this.#key}`;
        const response = await fetch(this.#forecastBase + query);
        const data = await response.json();
        return data.slice(0, 5);
    }
}
