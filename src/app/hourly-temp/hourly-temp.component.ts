import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-temp',
  templateUrl: './hourly-temp.component.html',
  styleUrls: ['./hourly-temp.component.css']

})
export class HourlyTempComponent implements OnInit {
    @Input() forecast;
    constructor() { }

    ngOnInit() {
    }

}
