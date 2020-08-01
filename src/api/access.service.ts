import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec, HttpErrorResponse
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import {Observable, throwError} from 'rxjs';

import { OrganizationAccess } from '../model/models';
import { PlaceAccess } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import {catchError} from 'rxjs/operators';
import {GeneralService} from './general.service';

/**
 *  API for request the authenticated accesses in an organization or place registered of one or more users
 */

@Injectable({
  providedIn: 'root'
})
export class AccessService extends GeneralService {
  /**
   * Create object for http request. In this case, it create object for request the authenticated accesses in an organization or place registered of one or more users
   * @param {HttpClient} httpClient object for http request
   * @param {string} basePath The URL of the server (and the database) -> IP:port
   * @param {Configuration} configuration object that contain Token firebase and key for firebase
   */
    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
      super(httpClient, basePath, configuration);
    }

    /**
     * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas).
     * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
     * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
     * @param {number} organizationId ID of an organization.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param {boolean}reportProgress flag to report request and response progress.
     * @param options metadata for http request
     * @returns a observable array of access into organization
     */
    public getAuthenticatedAccessListInOrganization(orgAuthServerIds: Array<string>, organizationId: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<OrganizationAccess>>;
  /**
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} organizationId ID of an organization.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean}reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into organization
   */
    public getAuthenticatedAccessListInOrganization(orgAuthServerIds: Array<string>, organizationId: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<OrganizationAccess>>>;
  /**
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} organizationId ID of an organization.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean}reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into organization
   */
    public getAuthenticatedAccessListInOrganization(orgAuthServerIds: Array<string>, organizationId: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<OrganizationAccess>>>;
  /**
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in an organization registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} organizationId ID of an organization.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean}reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into organization
   */
    public getAuthenticatedAccessListInOrganization(orgAuthServerIds: Array<string>, organizationId: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (orgAuthServerIds === null || orgAuthServerIds === undefined) {
            throw new Error('Required parameter orgAuthServerIds was null or undefined when calling getAuthenticatedAccessListInOrganization.');
        }
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling getAuthenticatedAccessListInOrganization.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<OrganizationAccess>>(`${this.configuration.basePath}/access/organization/${encodeURIComponent(String(organizationId))}/authenticated/${encodeURIComponent(String(orgAuthServerIds))}`,
            {
                responseType: responseType as any,
                withCredentials: this.configuration.withCredentials,
                headers,
                observe,
                reportProgress
            }
        ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
    }

    /**
     * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas).
     * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
     * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
     * @param {number} placeId ID of a place.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param {boolean} reportProgress flag to report request and response progress.
     * @param options metadata for http request
     * @returns a observable array of access into place of organization
     */
    public getAuthenticatedAccessListInPlace(orgAuthServerIds: Array<string>, placeId: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<PlaceAccess>>;
  /**
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} placeId ID of a place.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean} reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into place of organization
   */
    public getAuthenticatedAccessListInPlace(orgAuthServerIds: Array<string>, placeId: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<PlaceAccess>>>;
  /**
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} placeId ID of a place.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean} reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into place of organization
   */
    public getAuthenticatedAccessListInPlace(orgAuthServerIds: Array<string>, placeId: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<PlaceAccess>>>;
  /**
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas).
   * Returns all the authenticated accesses in a place registered of one or more users (orgAuthServerIds are separated by commas) that are fully registered. Fully registered means that there are both the entrance and the exit timestamp. Both app users and web-app administrators can access this end-point.
   * @param {Array<string>} orgAuthServerIds One or more orgAuthServerIds. If it is called by the app user, the orgAuthServerIds parameter can only consist in one identifier. Otherwise it can be more than one identifier.
   * @param {number} placeId ID of a place.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param {boolean} reportProgress flag to report request and response progress.
   * @param options metadata for http request
   * @returns a observable array of access into place of organization
   */
    public getAuthenticatedAccessListInPlace(orgAuthServerIds: Array<string>, placeId: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (orgAuthServerIds === null || orgAuthServerIds === undefined) {
            throw new Error('Required parameter orgAuthServerIds was null or undefined when calling getAuthenticatedAccessListInPlace.');
        }
        if (placeId === null || placeId === undefined) {
            throw new Error('Required parameter placeId was null or undefined when calling getAuthenticatedAccessListInPlace.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Array<PlaceAccess>>(`${this.configuration.basePath}/access/place/${encodeURIComponent(String(placeId))}/authenticated/${encodeURIComponent(String(orgAuthServerIds))}`,
            {
                responseType: responseType as any,
                withCredentials: this.configuration.withCredentials,
                headers,
                observe,
                reportProgress
            }
        ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
    }

}
