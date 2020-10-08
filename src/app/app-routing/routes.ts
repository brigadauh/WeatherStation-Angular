import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { AboutComponent } from '../about/about.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { SettingsComponent } from '../settings/settings.component';
import { HistoryComponent } from '../history/history.component';

export const routes: Routes = [
        { path: 'home', component: CurrentWeatherComponent },
        { path: 'history', component: HistoryComponent },
        { path: 'history/Last 7 days', component: AboutComponent },
        { path: 'history/Last 30 days', component: AboutComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'about', component: AboutComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
];
