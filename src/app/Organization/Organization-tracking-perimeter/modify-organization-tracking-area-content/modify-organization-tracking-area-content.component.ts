import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Organization, OrganizationService} from '../../../..';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from '@angular/common/http';

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
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
    });
  }

  // convenience getters for easy access to form fields
  get fcontr() { return this.dynamicForm.controls; }
  get tArray() { return this.fcontr.Organizzazioni as FormArray; }

  onChangePoints(e) {
    if (e === null || e === '' || e < 3) {
      this.Submitted = false;
      console.log(e);
    } else {
      this.Submitted = true;
      const numberOfPoints = e;
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
  }

  // display form values on success
  onSubmit() {
    if (!this.dynamicForm.invalid) {
        this.orgS.updateOrganizationTrackingArea(this.currentOrganization.id, JSON.stringify(this.dynamicForm.value, null, 4)).subscribe(() => {
            alert('Modifica al perimetro dell\'organizzazione effettuata.');
            this.currentOrganization.trackingArea = JSON.stringify(this.dynamicForm.value, null, 4);
          },
          (err: HttpErrorResponse) => {
          if (err.status === 400) {
            alert('Errore. I dati inseriti non sono validi');
          } else {
            alert(err.message);
          }
        });
        this.onReset();
    }
  }
  // reset whole form back to initial state
  onReset() {
    this.submitted = false;
    this.dynamicForm.reset();
    this.tArray.clear();
  }

  // clear errors and reset ticket fields
  onClear() {
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
