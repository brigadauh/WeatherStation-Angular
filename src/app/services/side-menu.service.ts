import { Injectable } from '@angular/core';
import { Menu } from '../shared/menu';
import { SIDEMENU } from '../shared/sidemenu';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SideMenuService {
  constructor() { }
  getMenu(): Observable<Menu[]> {
    return of(SIDEMENU);
    //.pipe(delay(2000));
  }


}
