import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Organization, OrganizationService} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-modify-place-tracking-area-content',
  templateUrl: './modify-organization-tracking-area-content.component.html',
  styleUrls: ['./modify-organization-tracking-area-content.component.css']
})
export class ModifyOrganizationTrackingAreaContentComponent implements OnInit {
  private Submitted = false;
  private currentOrganization: Organization;
  dynamicForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private orgS: OrganizationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      Organizzazioni: new FormArray([])
    });
  }

  // convenience getters for easy access to form fields
  get fcontr() { return this.dynamicForm.controls; }
  get tArray() { return this.fcontr.Organizzazioni as FormArray; }

  onChangePoints(e) {
    const numberOfPoints = e || 0;
    console.log(numberOfPoints);
    if (this.tArray.length < numberOfPoints) {
      for (let i = this.tArray.length; i < numberOfPoints; i++) {
        this.tArray.push(this.formBuilder.group({
          lat: ['', Validators.required],
          long: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.tArray.length; i >= numberOfPoints; i--) {
        this.tArray.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.orgS.updateOrganizationTrackingArea(this.currentOrganization.id, JSON.stringify(this.dynamicForm.value, null, 4)).subscribe(() => {});
    });
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.tArray.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.tArray.reset();
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get getCurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set setCurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }
}
