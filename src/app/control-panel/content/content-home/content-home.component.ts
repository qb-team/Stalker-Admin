/*
* Shows minimal informations about the interface usage
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {
  private actualOrganization: Organization;
  constructor(private activatedRoute: ActivatedRoute) { }

  get getAcutalOrganization(): Organization {
    return this.actualOrganization;
  }

  set setAcutalOrganization(value: Organization) {
    this.actualOrganization = value;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((org: Organization) => { this.actualOrganization = org; } );
  }

}
