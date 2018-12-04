import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { AboutComponent } from '../about/about.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
//import { AboutComponent } from '../about/about.component';

export const routes: Routes = [
        { path: 'home', component: CurrentWeatherComponent },
        { path: 'history', component: AboutComponent },
        { path: 'settings/location', component: AboutComponent },
        { path: 'settings/units/temp', component: AboutComponent },
        { path: 'settings/units/pressure', component: AboutComponent },
        { path: 'about', component: AboutComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
];
