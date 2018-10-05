import { Component, OnInit } from '@angular/core';
import * as utils from '../utils';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.css']
})
export class CurrentTimeComponent implements OnInit {
  isSeconds = true;
  repeatInterval = 1000;
  currentDate = utils.currentTime(this.isSeconds);
  i = 0;
  constructor() {
      setInterval(() => {
          this.currentDate = utils.currentTime(this.isSeconds);
          this.i++;
          if ( this.i > 15) {
              this.i = 0;
              this.isSeconds = false;
          }
          return false;
      },this.repeatInterval);
  }

  ngOnInit() {

  }

}
