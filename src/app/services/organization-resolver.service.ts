import {EventEmitter, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Organization, OrganizationService} from '../..';
import {DataService} from './data.service';
import {createAwait} from 'scuri/lib/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationResolverService implements Resolve<Array<Organization>> {
  actualOrganization: Organization;

  constructor( private ds: DataService , private os: OrganizationService ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Organization>> | Promise<Array<Organization>> | Array<Organization> {
    /*const observable: Observable<Array<Organization>> = new Observable(observer => {
      observer.next(this.ds.getUserOrganizations());
      observer.complete();
    });
    return observable;*/
    return this.os.getOrganizationList();
  }
}
