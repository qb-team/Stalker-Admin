import { Component, OnInit } from '@angular/core';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Organization, OrganizationService} from '../../../..';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-organization-management-content',
  templateUrl: './organization-management-content.component.html',
  styleUrls: ['./organization-management-content.component.css']
})
export class OrganizationManagementContentComponent implements OnInit {

  private name: string;
  private street: string;
  private number: string;
  private postCode: number;
  private city: string;
  private country: string;
  private descr: string;
  private descrR: string;
  private currentOrganization: Organization;
  private change = 'modify';
  modifyForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private orgS: OrganizationService) { }

  ngOnInit(): void {
    this.setupModifyForm();
  }

  private setupModifyForm() {
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name),
      Street: new FormControl(this.street),
      Number: new FormControl(this.number),
      PostCode: new FormControl(this.postCode),
      City: new FormControl(this.city),
      Country: new FormControl(this.country),
      Descr: new FormControl(this.descr),
      DescrR: new FormControl(this.descrR, [
        Validators.required,
        Validators.minLength(100)
        ]),
    });
  }

  onChange(val: string) {
    this.change = val;
  }

  onModify() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      if (this.name != null && this.name !== ' ') {
        this.currentOrganization.name = this.name;
      }

      if (this.street != null && this.street !== ' ') {
        this.currentOrganization.street = this.street;
      }

      if (this.number != null && this.number !== ' ') {
        this.currentOrganization.number = this.number;
      }

      if (this.postCode != null) {
        this.currentOrganization.postCode = this.postCode;
      }

      if (this.city != null && this.city !== ' ') {
        this.currentOrganization.city = this.city;
      }

      if (this.country != null && this.country !== ' ') {
        this.currentOrganization.country = this.country;
      }

      if (this.descr != null && this.descr !== ' ') {
        this.currentOrganization.description = this.descr;
      }

      this.orgS.updateOrganization(this.currentOrganization).subscribe(() => {});
      this.name = null;
      this.street = null;
      this.number = null;
      this.postCode = null;
      this.city = null;
      this.country = null;
      this.descr = null;
    });
  }

  onRemove() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.orgS.requestDeletionOfOrganization(this.currentOrganization.id, this.descrR).subscribe(() => {});
      this.descrR = null;
    });
  }
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  get Street(): string {
    return this.street;
  }

  set Street(value: string) {
    this.street = value;
  }

  get Number(): string {
    return this.number;
  }

  set Number(value: string) {
    this.number = value;
  }

  get PostCode(): number {
    return this.postCode;
  }

  set PostCode(value: number) {
    this.postCode = value;
  }

  get City(): string {
    return this.city;
  }

  set City(value: string) {
    this.city = value;
  }

  get Country(): string {
    return this.country;
  }

  set Country(value: string) {
    this.country = value;
  }

  get Descr(): string {
    return this.descr;
  }

  set Descr(value: string) {
    this.descr = value;
  }
  get DescrR(): string {
    return this.descrR;
  }

  set DescrR(value: string) {
    this.descrR = value;
  }
  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }
  get Change(): string {
    return this.change;
  }

  set Change(value: string) {
    this.change = value;
  }
}
