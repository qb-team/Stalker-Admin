
import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { TimePerUserReport } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {GeneralService} from "./general.service";



@Injectable({
  providedIn: 'root'
})
export class ReportService extends GeneralService {

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    super(httpClient, basePath, configuration);
  }

  /**
   * Gets the report of total time spent per user inside the place of an organization.
   * Gets the report of total time spent by each user inside the place of an organization. Only web-app administrators can access this end-point.
   * @param placeId ID of the place. The viewer administrator must have permissions for this organization.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTimePerUserReport(placeId: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<TimePerUserReport>>;
  public getTimePerUserReport(placeId: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<TimePerUserReport>>>;
  public getTimePerUserReport(placeId: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<TimePerUserReport>>>;
  public getTimePerUserReport(placeId: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
    if (placeId === null || placeId === undefined) {
      throw new Error('Required parameter placeId was null or undefined when calling getTimePerUserReport.');
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

    return this.httpClient.get<Array<TimePerUserReport>>(`${this.configuration.basePath}/report/place/${encodeURIComponent(String(placeId))}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
