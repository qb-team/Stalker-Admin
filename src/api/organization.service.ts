
import { Inject, Injectable, Optional }                      from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec, HttpErrorResponse
} from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import {Observable, throwError} from 'rxjs';

import {Organization, OrganizationDeletionRequest} from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {catchError} from 'rxjs/operators';
import {GeneralService} from "./general.service";



@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends GeneralService{

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    super(httpClient, basePath, configuration);
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

    /**
     * Gets the available data for a single organization.
     * Gets the data available for a single organization.  Both app users and web-app administrators can access this end-point but,  app users can request information for all the organizations while web-app  administrators can only for the organizations they have access to.
     * @param organizationId ID of an organization.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrganization(organizationId: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Organization>;
    public getOrganization(organizationId: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Organization>>;
    public getOrganization(organizationId: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Organization>>;
    public getOrganization(organizationId: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling getOrganization.');
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
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<Organization>(`${this.configuration.basePath}/organization/${encodeURIComponent(String(organizationId))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
    }

  /**
   * Updates one or more properties of an organization.
   * Updates one or more properties of an organization.  Only web-app administrators (if they have the correct access rights) can access this end-point.
   * @param organization
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateOrganization(organization: Organization, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Organization>;
  public updateOrganization(organization: Organization, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Organization>>;
  public updateOrganization(organization: Organization, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Organization>>;
  public updateOrganization(organization: Organization, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
    if (organization === null || organization === undefined) {
      throw new Error('Required parameter organization was null or undefined when calling updateOrganization.');
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


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<Organization>(`${this.configuration.basePath}/organization`,
      organization,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
  }

    /**
     * Updates the coordinates of the tracking area of an organization.
     * Updates the coordinates of the tracking area of an organization. Only web-app administrators can access this end-point.
     * @param organizationId ID of an organization. The administrator must have at least manager permission to the organization.
     * @param trackingArea JSON representation of a tracking trackingArea.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrganizationTrackingArea(organizationId: number, trackingArea: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Organization>;
    public updateOrganizationTrackingArea(organizationId: number, trackingArea: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Organization>>;
    public updateOrganizationTrackingArea(organizationId: number, trackingArea: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Organization>>;
    public updateOrganizationTrackingArea(organizationId: number, trackingArea: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (organizationId === null || organizationId === undefined) {
            throw new Error('Required parameter organizationId was null or undefined when calling updateOrganizationTrackingArea.');
        }
        if (trackingArea === null || trackingArea === undefined) {
            throw new Error('Required parameter trackingArea was null or undefined when calling updateOrganizationTrackingArea.');
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

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: this.encoder});
        }

        if (trackingArea !== undefined) {
            formParams = formParams.append('trackingArea', <any>trackingArea) as any || formParams;
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.patch<Organization>(`${this.configuration.basePath}/organization/${encodeURIComponent(String(organizationId))}/trackingArea`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
    }


  /**
   * Sends a deletion request to the system. The request will be examined by Stalker administrators.
   * Sends a deletion request to the system.  The request will be examined by Stalker administrators. Only web-app administrators can access this end-point.
   * @param organizationDeletionRequest
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestDeletionOfOrganization(organizationDeletionRequest: OrganizationDeletionRequest, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
  public requestDeletionOfOrganization(organizationDeletionRequest: OrganizationDeletionRequest, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
  public requestDeletionOfOrganization(organizationDeletionRequest: OrganizationDeletionRequest, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
  public requestDeletionOfOrganization(organizationDeletionRequest: OrganizationDeletionRequest, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
    if (organizationDeletionRequest === null || organizationDeletionRequest === undefined) {
      throw new Error('Required parameter organizationDeletionRequest was null or undefined when calling requestDeletionOfOrganization.');
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
      ];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }


    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.post<any>(`${this.configuration.basePath}/organization/requestdeletion`,
      organizationDeletionRequest,
      {
        responseType: <any> responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    ).pipe(catchError((err: HttpErrorResponse) => throwError(err)));
  }
}
