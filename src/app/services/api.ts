import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export function getDataCurrent() : any {
    return fetch(`/api/weather/temphumidity/current`)
    .then(result=>result.json())
    .then(tempCurr=>tempCurr.data[0])
    .catch((err) => console.log('getDataCurrent catch'));
}
export function getDataForecast() : any {
    return fetch(`/api/weather/forecast`)
    .then(result=>result.json())
    .then(forecast => forecast.data)
    .catch((err) => console.log('getDataCurrent catch'));
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
    private apiUrl = '/api/weather';
    constructor(
        private http: HttpClient
    ) {}
    getDataCurrent() : Observable<any> {
        return this.http.get<any>(this.apiUrl+'/temphumidity/current')
        .pipe(
            tap(currentData => {
                //console.log('currentData',currentData);
            }),
            catchError(this.handleError('currentData', []))
        );

    }
    getDataForecast() : Observable<any> {
        return this.http.get<any>(this.apiUrl+'/forecast')
        .pipe(
            tap(forecastData => {
            //    console.log('forecastData',forecastData);
            }),
            catchError(this.handleError('forecastData', []))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }
}
