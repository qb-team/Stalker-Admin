/*
* A wrapper component to hold a content-specific component. Switching between functionalities will cause specific components to show or hide into this component
*/
import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/model/models';
import {ActivatedRoute} from '@angular/router';
import {AdministratorDataService} from '../../services/AdministratorData.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  constructor( ) { console.log('Constructor content component'); }



  ngOnInit() {

  }


}
