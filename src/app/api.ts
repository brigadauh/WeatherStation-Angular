export function getDataCurrent() {
    return fetch(`/api/weather/temphumidity/current`)
    .then(result=>result.json())
    .then(tempCurr=>tempCurr.data[0])
    .catch((err) => console.log('getDataCurrent catch'));
}
export function getDataForecast() {
    return fetch(`/api/weather/forecast`)
    .then(result=>result.json())
    .then(forecast => forecast.data)
    .catch((err) => console.log('getDataCurrent catch'));
}
/*
export getDataCurrent2 (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
}
*/
