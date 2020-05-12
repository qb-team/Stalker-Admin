import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Organization, OrganizationService} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-modify-place-tracking-area-content',
  templateUrl: './modify-organization-tracking-area-content.component.html',
  styleUrls: ['./modify-organization-tracking-area-content.component.css']
})
export class ModifyOrganizationTrackingAreaContentComponent implements OnInit {
  private Submitted = false;
  private lat1: string ;
  private lat2: string ;
  private lat3: string ;
  private lat4: string ;
  private long1: string ;
  private long2: string ;
  private long3: string ;
  private long4: string ;
  private currentOrganization: Organization;
  coForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private orgS: OrganizationService) { }

  ngOnInit(): void {
    this.setupCoordForm();
  }

  private setupCoordForm() {
    this.coForm = new FormGroup({
      Lat1: new FormControl(this.lat1, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Long1: new FormControl(this.long1, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Lat2: new FormControl(this.lat2, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Long2: new FormControl(this.long2, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Lat3: new FormControl(this.lat3, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Long3: new FormControl(this.long3, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Lat4: new FormControl(this.lat4, [
        Validators.required,
        Validators.minLength(9)
      ]),
      Long4: new FormControl(this.long4, [
        Validators.required,
        Validators.minLength(9)
      ]),
    });
  }
  modifyCoord() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      const trackingArea = '{\n' +
        '"Organizzazioni":[\n' +
        '    {\n' +
        '        "lat":' + this.lat1 + ',\n' +
        '        "long":' + this.long1 + '\n' +
        '    },\n' +
        '    {\n' +
        '        "lat":' + this.lat2 + ',\n' +
        '        "long":' + this.long2 + '\n' +
        '    },\n' +
        '    {\n' +
        '        "lat": ' + this.lat3 + ',\n' +
        '        "long": ' + this.long3 + '\n' +
        '    },\n' +
        '    {\n' +
        '        "lat": ' + this.lat4 + ',\n' +
        '        "long": ' + this.long4 + '\n' +
        '    }\n' +
        ']' +
        '}';
      console.log(this.currentOrganization.name);
      console.log('ci sono');
      for (const coord of trackingArea) {
          console.log(coord);
      }
      this.orgS.updateOrganizationTrackingArea(this.currentOrganization.id, trackingArea);
    });
  }
  onSubmit(): void {
    this.Submitted = true;
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get Lat1(): string {
    return this.lat1;
  }

  set Lat1(value: string) {
    this.lat1 = value;
  }

  get Lat2(): string {
    return this.lat2;
  }

  set Lat2(value: string) {
    this.lat2 = value;
  }

  get Lat3(): string {
    return this.lat3;
  }

  set Lat3(value: string) {
    this.lat3 = value;
  }

  get Lat4(): string {
    return this.lat4;
  }

  set Lat4(value: string) {
    this.lat4 = value;
  }

  get Long1(): string {
    return this.long1;
  }

  set Long1(value: string) {
    this.long1 = value;
  }

  get Long2(): string {
    return this.long2;
  }

  set Long2(value: string) {
    this.long2 = value;
  }

  get Long3(): string {
    return this.long3;
  }

  set Long3(value: string) {
    this.long3 = value;
  }

  get Long4(): string {
    return this.long4;
  }

  set Long4(value: string) {
    this.long4 = value;
  }
  get getCurrentOrg(): Organization {
    return this.currentOrganization;

  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }
}
