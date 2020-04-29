import {EventEmitter, Injectable} from '@angular/core';
import {OrganizationAccess, PlaceAccess} from '../..';

@Injectable({
  providedIn: 'root'
})

export class AccessDataService {
  private usersPlaceAccesses: EventEmitter<Array<PlaceAccess>>;
  private usersOrganizationAccesses: EventEmitter<Array<OrganizationAccess>>;

  getPlaceAccesses(): EventEmitter<Array<PlaceAccess>> {
    return this.usersPlaceAccesses;
  }

  getOrganizationAccesses(): EventEmitter<Array<OrganizationAccess>> {
    return this.usersOrganizationAccesses;
  }
