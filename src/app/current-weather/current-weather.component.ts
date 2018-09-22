import { Component, OnInit } from '@angular/core';
import * as api from '../api';
import * as utils from '../utils';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
    DEBUG: boolean = false;
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
    tempC_forecast="";
    tempC_forecast_Time="";
    units = utils.getCookie('temperature-units') || 'C';
    constructor() {
        this.getCurrentData();
        setInterval(() => {this.getCurrentData()},this.repeatIntervalCurrent);
        this.getForecastData();
        setInterval(() => {this.getForecastData()},this.repeatIntervalForecast);
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
              this.tempTrendSymbol = '';
          }
          this.DEBUG && console.log('getTempCurrent',this.currentWeatherData,this.currentWeatherData.temp);
      })
    }
    getForecastData(): void {
      api.getDataForecast()
      .then((forecastData) => {
          this.forecastArray = this.hourlyData(forecastData);
          this.DEBUG && console.log('forecastArray:', this.forecastArray);
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
        let forecastArray = [];
        for (let i = 0; i < forecasts.length; i++) {
            if (i > 0) { // ignore 1st element because it is in the past, considering 3hr difference
                let forecastDateTime = forecasts[i]["forecast_date"];
                //console.log('forecastDateTime1',forecastDateTime);
                let forecastDateTimeD =new Date(forecastDateTime);
                forecastDateTimeD.setHours(forecastDateTimeD.getHours()-3);
                forecastDateTime = utils.formatDate(forecastDateTimeD);
                //console.log('forecastDateTime2',forecastDateTime);
                let forecast=forecasts[i]["forecasts"];
                let maxTemp=(Number(forecast.main.temp_max)-273) || -273;
                let minTemp=(Number(forecast.main.temp_min)-273) || +100;
                if (maxTemp < maxTempPrev) {maxStop=true;} // stop when max temperature started to decline
                if (minTemp > minTempPrev) {minStop=true;} // stop when min temperature started to rise
                if (maxTemp > maxTempForecast && !maxStop ) {maxTempForecast=maxTemp; this.maxTempTime=forecastDateTime.substring(0,16);}
                if (minTemp < minTempForecast && !minStop) {minTempForecast=minTemp; this.minTempTime=forecastDateTime.substring(0,16);}
                maxTempPrev = maxTemp;
                minTempPrev = minTemp;
                //forecastDateTimePrev = forecastDateTime.substring(0,16);
                forecastArray.push({"maxTemp":maxTemp, "minTemp":minTemp, "time":forecastDateTime.substring(11,16)});
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

        return forecastArray;
    }
    switchUnits() {
        if (this.units ==='C') { this.units ='F'} else {this.units = 'C'}
        utils.setCookie('temperature-units', this.units, 3650,'/');
    }

    ngOnInit() {
    }

}
