import { Component, OnInit } from '@angular/core';
import {Organization, OrganizationService, Place, PlaceService} from '../../../..';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {HttpErrorResponse} from "@angular/common/http";

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
      if (org != null) {
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
          this.currentPlace = places[0];
        });
      }
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

  // display form values on success
  onSubmit() {
    if (!this.dynamicForm.invalid) {
        this.plS.updatePlace(this.currentPlace).subscribe(() => {
          alert('Modifica al perimetro del luogo dell\'organizzazione effettuata.');
          this.currentPlace.trackingArea = JSON.stringify(this.dynamicForm.value, null, 4);
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
    this.Submitted = false;
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
