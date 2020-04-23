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
    console.log('Constructor resolver');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<Organization>> | Promise<Array<Organization>> | Array<Organization> {
    return this.os.getOrganizationList();

    /*const observable: Observable<Organization> = new Observable(observer => {
      observer.next(this.ds.org.);
      observer.complete();
    });
    return observable;*/
    /*orgSub.subscribe((organ: Organization) => {
      this.actualOrganization = organ;
    });
    console.log('Returning orgSub:' + orgSub);
    this.ds.org = orgSub as EventEmitter<Organization>;

    console.log('Returning actualOrg:' + this.actualOrganization);
    return this.actualOrganization;*/
  }
}
