import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService, Place, PlaceService} from '../../../..';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';

@Component({
  selector: 'app-modify-place-tracking-area-content',
  templateUrl: './modify-place-tracking-area-content.component.html',
  styleUrls: ['./modify-place-tracking-area-content.component.css']
})
export class ModifyPlaceTrackingAreaContentComponent implements OnInit {
  private Submitted = false;
  private currentOrganization: Organization;
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  dynamicForm: FormGroup;

  constructor(private ads: AdministratorOrganizationDataService, private plS: PlaceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      Organizzazioni: new FormArray([])
    });
    this.loadPlaceList();
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
        this.PlaceArr = places;
        this.currentPlace = places[0];
      });
    });
  }

  setPlace(click: any) {
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
    console.log(this.currentPlace);
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
      console.log(e);
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

  onSubmit() {
    if (!this.dynamicForm.invalid) {
      // display form values on success
      this.ads.getOrganization.subscribe((org: Organization) => {
        this.currentOrganization = org;
        this.currentPlace.trackingArea = JSON.stringify(this.dynamicForm.value, null, 4);
        this.plS.updatePlace(this.currentPlace).subscribe(() => {});
      });
      alert(JSON.stringify(this.dynamicForm.value, null, 4));
      this.onReset();
    }
  }

  onReset() {
    // reset whole form back to initial state
    this.Submitted = false;
    this.dynamicForm.reset();
    this.tArray.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.tArray.reset();
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }

  get CurrentOrg(): Organization {
    return this.currentOrganization;
  }

  set CurrentOrg(value: Organization) {
    this.currentOrganization = value;
  }

  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  set CurrentPlace(value: Place) {
    this.currentPlace = value;
  }
}
