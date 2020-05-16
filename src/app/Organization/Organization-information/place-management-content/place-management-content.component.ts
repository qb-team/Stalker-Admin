import {Component, OnDestroy, OnInit} from '@angular/core';
import {Organization, Place, PlaceService} from '../../../..';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdministratorOrganizationDataService} from '../../../services/AdministratorOrganizationData.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-place-management-content',
  templateUrl: './place-management-content.component.html',
  styleUrls: ['./place-management-content.component.css']
})
export class PlaceManagementContentComponent implements OnInit {
  private Submitted = false;
  private currentOrganization: Organization;
  private change = 'create';
  private name: string;
  PlaceArr: Array<Place>;
  private currentPlace: Place;
  modifyForm: FormGroup;
  createForm: FormGroup;
  constructor(private ads: AdministratorOrganizationDataService, private plS: PlaceService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      Organizzazioni: new FormArray([])
    });
    this.loadPlaceList();
    this.setupModifyForm();
  }

  loadPlaceList() {
    this.ads.getOrganization.subscribe((org: Organization) => {
      this.currentOrganization = org;
      if (org != null) {
        this.plS.getPlaceListOfOrganization(org.id).subscribe((places: Array<Place>) => {
          this.PlaceArr = places;
          if (this.PlaceArr != null) {
            this.currentPlace = places[0];
          } else {
            this.onChange('create');
          }
        });
      }
    });
  }

  setPlace(click: any) {
    console.log(this.currentOrganization);
    this.currentPlace = this.PlaceArr[click.target.attributes.id.value];
    console.log(this.currentPlace);
  }

  private setupModifyForm() {
    console.log(this.currentOrganization);
    this.modifyForm = new FormGroup({
      Name: new FormControl(this.name, [Validators.required]),
    });
  }

  onModify() {
      this.currentPlace.name = this.name;
      this.plS.updatePlace(this.currentPlace).subscribe(() => {});
  }

  onChange(val: string) {
    this.change = val;
  }

  onRemove() {
    if (this.PlaceArr != null) {
      if (confirm('Stai per eliminare ' + this.currentPlace.name + '. Continuare?')) {
          this.plS.deletePlace(this.currentPlace.id).subscribe(() => {});
          this.loadPlaceList();
      }
    }
  }

  get fcontr() { return this.createForm.controls; }
  get tArray() { return this.fcontr.Organizzazioni as FormArray; }

  onChangePoints(e, e2) {
    if (e === null || e === '' || e < 3 || e2 == null || e2 === '') {
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
  onCreate(e) {
    if (!this.createForm.invalid) {
        const newPlace = this.currentPlace;
        console.log(e.value);
        newPlace.name = e.value;
        newPlace.id = null;
        console.log(newPlace.id);
        newPlace.organizationId = this.currentOrganization.id;
        newPlace.trackingArea = JSON.stringify(this.createForm.value, null, 4);
        this.plS.createNewPlace(newPlace).subscribe(() => {});
        this.loadPlaceList();
        this.onReset();
        e.innerHTML = null;
    }
  }
  // reset whole form back to initial state
  onReset() {
    this.Submitted = false;
    this.createForm.reset();
    this.tArray.clear();
  }
  // clear errors and reset ticket fields
  onClear() {
    this.tArray.reset();
  }

  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
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
  get CurrentPlace(): Place {
    return this.currentPlace;
  }

  set CurrentPlace(value: Place) {
    this.currentPlace = value;
  }

  get submitted(): boolean {
    return this.Submitted;
  }

  set submitted(value: boolean) {
    this.Submitted = value;
  }
}
