import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HourlyTempComponent } from './hourly-temp/hourly-temp.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { HttpClientModule }    from '@angular/common/http';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuItemsComponent } from './side-menu-items/side-menu-items.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    HourlyTempComponent,
    CurrentTimeComponent,
    SideMenuComponent,
    SideMenuItemsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
