import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('f', { static: true }) settingForm: NgForm;
  email = localStorage.getItem('email') || '';
  location = localStorage.getItem('location') || '';
  temp_unit = localStorage.getItem('tempUnit') || 'C';
  screenMode = localStorage.getItem('screenMode') || 'light';
  submitted = false;
  constructor() { }

  ngOnInit() {
  }
  unitChosen(unit) {
    this.temp_unit = unit;
    localStorage.setItem('tempUnit', unit);
  }
  modeChosen(mode) {
    this.screenMode = mode;
    localStorage.setItem('screenMode', mode);
  }
  onSubmit() {
    this.submitted = true;
    localStorage.setItem('location', this.location);
    localStorage.setItem('email', this.email);
    // this.settingForm.reset();
  }

}
