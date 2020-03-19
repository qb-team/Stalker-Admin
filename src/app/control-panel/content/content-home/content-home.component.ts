/*
* Shows minimal informations about the interface usage
*/
import { Component, OnInit, Input } from '@angular/core';
import { Organization } from 'src/model/models';

@Component({
  selector: 'app-content-home',
  templateUrl: './content-home.component.html',
  styleUrls: ['./content-home.component.css']
})
export class ContentHomeComponent implements OnInit {

  @Input() org: Organization;
  constructor() { }

  ngOnInit(): void {
  }

}
