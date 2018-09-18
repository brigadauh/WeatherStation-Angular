import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HourlyTempComponent } from './hourly-temp/hourly-temp.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    HourlyTempComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
