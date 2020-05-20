/*
 * Parent component
 */
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {

  constructor() {
    console.log('App comp consturctor');
  }
 }
