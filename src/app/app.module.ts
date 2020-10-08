import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HourlyTempComponent } from './hourly-temp/hourly-temp.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuItemsComponent } from './side-menu-items/side-menu-items.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    HourlyTempComponent,
    CurrentTimeComponent,
    SideMenuComponent,
    SideMenuItemsComponent,
    AboutComponent,
    SettingsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
