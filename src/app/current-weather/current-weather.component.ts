import { Component, OnInit } from '@angular/core';
import * as api from '../services/api';
import * as utils from '../utils';
import { WeatherService }  from '../services/api';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
    DEBUG: boolean = true;
    currentWeatherData = null;
    downArrow = '\u2193';
    upArrow = '\u2191';
    tempTrend = 0;
    tempTrendSymbol = '';
    forecastArray = null;
    repeatIntervalCurrent = 120000;
    repeatIntervalForecast = 300000;
    minTempTime=utils.currentDate();
    maxTempTime=utils.currentDate();
    tempC_forecast="-273";
    tempC_forecast_Time="";
    // units:string = utils.getCookie('temperature-units') || 'C';
    units:string = localStorage.getItem('tempUnit') || 'C';
    strTempF_current:string = '';
    strTempC_current:string = '';
    strTempF_forecast:string = '';
    strTempC_forecast:string = '';
    constructor(private weatherService: WeatherService) {
        this.getCurrentDataObservable();
        setInterval(() => {this.getCurrentDataObservable()},this.repeatIntervalCurrent);
        this.getForecastObservable();
        setInterval(() => {this.getForecastObservable()},this.repeatIntervalForecast);
    }
    getCurrentData(): void {
      //let self = this;
      api.getDataCurrent()
      .then((currentWeatherData) => {
          this.currentWeatherData = currentWeatherData;
          if (Number(this.currentWeatherData.temp) > Number(this.currentWeatherData.recent_temp)) {
              this.tempTrend = 1;
              this.tempTrendSymbol = this.upArrow;
          }
          else if (Number(this.currentWeatherData.temp) < Number(this.currentWeatherData.recent_temp)) {
              this.tempTrend = -1;
              this.tempTrendSymbol = this.downArrow;
          }
          else {
              this.tempTrend = 0;
              this.tempTrendSymbol = ' ';
          }
          this.DEBUG && console.log('getTempCurrent',this.currentWeatherData,this.currentWeatherData.temp);
          this.strTempF_current = (this.units ==='C' ? this.currentWeatherData.temp*1.8+32 : this.currentWeatherData.temp*1.0).toFixed(0);
          this.strTempC_current = (this.units ==='C' ? this.currentWeatherData.temp*1.0 : this.currentWeatherData.temp*1.8+32).toFixed(0);

      })
    }

    getCurrentDataObservable(): void {
        this.weatherService.getDataCurrent()
        .subscribe((currentWeather) => {
            this.currentWeatherData = currentWeather.data[0];
            //console.log('this.currentWeatherData',this.currentWeatherData)
            if (Number(this.currentWeatherData.temp) > Number(this.currentWeatherData.recent_temp)) {
                this.tempTrend = 1;
                this.tempTrendSymbol = this.upArrow;
            }
            else if (Number(this.currentWeatherData.temp) < Number(this.currentWeatherData.recent_temp)) {
                this.tempTrend = -1;
                this.tempTrendSymbol = this.downArrow;
            }
            else {
                this.tempTrend = 0;
                this.tempTrendSymbol = ' ';
            }
            this.DEBUG && console.log('getTempCurrent',this.currentWeatherData,this.currentWeatherData.temp);
            this.strTempF_current = (this.units ==='C' ? this.currentWeatherData.temp*1.8+32 : this.currentWeatherData.temp*1.0).toFixed(0);
            this.strTempC_current = (this.units ==='C' ? this.currentWeatherData.temp*1.0 : this.currentWeatherData.temp*1.8+32).toFixed(0);

        });
    }

    getForecastData(): void {
      api.getDataForecast()
      .then((forecastData) => {
          this.forecastArray = this.hourlyData(forecastData);
          this.DEBUG && console.log('forecastArray:', this.forecastArray);
          this.strTempF_forecast = (this.units ==='C' ? Number(this.tempC_forecast)*1.8+32 : Number(this.tempC_forecast)*1.0).toFixed(0);
          this.strTempC_forecast = (this.units ==='C' ? Number(this.tempC_forecast)*1.0 : Number(this.tempC_forecast)*1.8+32).toFixed(0);
      })
    }
    getForecastObservable(): void {
        this.weatherService.getDataForecast()
        .subscribe((forecastWeather) => {
            console.log('forecastWeather',forecastWeather);
            this.forecastArray = this.hourlyData(forecastWeather.data);
            this.DEBUG && console.log('forecastArray:', this.forecastArray);
            this.strTempF_forecast = (this.units ==='C' ? Number(this.tempC_forecast)*1.8+32 : Number(this.tempC_forecast)*1.0).toFixed(0);
            this.strTempC_forecast = (this.units ==='C' ? Number(this.tempC_forecast)*1.0 : Number(this.tempC_forecast)*1.8+32).toFixed(0);
        })
    }
    hourlyData(forecasts) {
        let maxTempForecast=-273;
        let minTempForecast=100;
        let minTempForecastS = minTempForecast.toFixed(0);
        let maxTempForecastS = maxTempForecast.toFixed(0);

        let maxTempPrev=-273;
        let minTempPrev=100;
        let minStop=false;
        let maxStop=false;
        let forecastArrayOut = [];
        //console.log('forecasts',forecasts);
        for (let i = 0; i < forecasts.length; i++) {
            if (i > 0) { // ignore 1st element because it is in the past, considering 3hr difference
                let forecastDateTime = forecasts[i]["forecast_date"];
                let forecastDateTimeD =new Date(forecastDateTime);
                forecastDateTimeD.setHours(forecastDateTimeD.getHours()-3);
                forecastDateTime = utils.formatDate(forecastDateTimeD);
                //console.log('forecastDateTime2',forecastDateTime);
                const forecast=forecasts[i]["forecasts"];
                let maxTemp=(Number(forecast.main.temp_max)-273) || -273;
                let minTemp=(Number(forecast.main.temp_min)-273) || +100;
                const hourlyWeather = forecast.weather[0];
                let conditionDescription = hourlyWeather.description;
                let icon = hourlyWeather.icon;
                if (maxTemp < maxTempPrev) {maxStop=true;} // stop when max temperature started to decline
                if (minTemp > minTempPrev) {minStop=true;} // stop when min temperature started to rise
                if (maxTemp > maxTempForecast && !maxStop ) {maxTempForecast=maxTemp; this.maxTempTime=forecastDateTime.substring(0,16);}
                if (minTemp < minTempForecast && !minStop) {minTempForecast=minTemp; this.minTempTime=forecastDateTime.substring(0,16);}
                maxTempPrev = maxTemp;
                minTempPrev = minTemp;
                //forecastDateTimePrev = forecastDateTime.substring(0,16);
                forecastArrayOut.push({"maxTemp":maxTemp, "minTemp":minTemp, "time":forecastDateTime.substring(11,16), "condition": conditionDescription, "icon": icon});
                //console.log('forecast',forecastDateTime,maxTemp,minTemp );
                //}
            }
        }
        if (minTempForecast === 100){minTempForecastS = "n/a"} else {
            //console.log('minTempC',minTempC );
            minTempForecastS = minTempForecast.toFixed(0);
            if (minTempForecast > 0) {minTempForecastS="+" + minTempForecastS;}
            if (minTempForecastS === "-0") {minTempForecastS = "0";}
        }
        if (maxTempForecast === -273){maxTempForecastS = "n/a"} else {
            maxTempForecastS = maxTempForecast.toFixed(0);
            if (maxTempForecast > 0) {maxTempForecastS = "+" + maxTempForecastS;}
            if (maxTempForecastS === "-0") {maxTempForecastS = "0";}
        }
        this.tempC_forecast = (this.tempTrend === -1) ? minTempForecastS : maxTempForecastS;
        this.tempC_forecast_Time = (this.tempTrend === -1) ? this.minTempTime : this.maxTempTime;

        return forecastArrayOut;
    }
    switchUnits() {
        if (this.units ==='C') { this.units ='F'} else {this.units = 'C'}
        //utils.setCookie('temperature-units', this.units, 3650,'/');
        localStorage.setItem('tempUnit', this.units);
    }

    ngOnInit() {
    }

}
