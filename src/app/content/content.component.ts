/*
* A wrapper component to hold a content-specific component. Switching between functionalities will cause specific components to show or hide into this component
*/
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  constructor( ) {  }



  ngOnInit() {

  }


}
