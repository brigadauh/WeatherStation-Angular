import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hourly-temp',
  templateUrl: './hourly-temp.component.html',
  styleUrls: ['./hourly-temp.component.css']

})
export class HourlyTempComponent implements OnInit {
    @Input() forecast;
    @Input() units: string;
    DEBUG: boolean = false;
    maxTemp: string = '';
    minTemp: string = '';
    condition: string = '';
    icon: string = '';
    downArrow: string = '\u2193';
    upArrow: string = '\u2191';
    time: string = '';

    ngOnInit() {
        this.DEBUG && console.log('unit', this.units);
    }
    ngOnChanges() {
        this.maxTemp = this.upArrow + ((this.units === 'F') ? (this.forecast.maxTemp * 1.8) + 32 : this.forecast.maxTemp).toFixed(0) ;
        this.minTemp = this.downArrow + ((this.units === 'F') ? (this.forecast.minTemp * 1.8) + 32 : this.forecast.minTemp).toFixed(0);
        this.time = this.forecast.time;
        this.condition = this.forecast.condition;
        this.icon = this.forecast.icon;
    }

}
