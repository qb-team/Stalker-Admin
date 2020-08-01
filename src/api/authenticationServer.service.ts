
import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { OrganizationAuthenticationServerInformation } from '../model/models';
import { OrganizationAuthenticationServerRequest } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {GeneralService} from "./general.service";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationServerService extends GeneralService {

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    super(httpClient, basePath, configuration);
  }

    /**
     * Gets the information on users given their identifier on the organization\&#39;s authentication server.
     * Gets the information on users given their identifier on the organization\&#39;s authentication server. Only web-app administrators can access this end-point.
     * @param organizationAuthenticationServerRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserInfoFromAuthServer(organizationAuthenticationServerRequest: OrganizationAuthenticationServerRequest, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<Array<OrganizationAuthenticationServerInformation>>;
    public getUserInfoFromAuthServer(organizationAuthenticationServerRequest: OrganizationAuthenticationServerRequest, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpResponse<Array<OrganizationAuthenticationServerInformation>>>;
    public getUserInfoFromAuthServer(organizationAuthenticationServerRequest: OrganizationAuthenticationServerRequest, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json'}): Observable<HttpEvent<Array<OrganizationAuthenticationServerInformation>>>;
    public getUserInfoFromAuthServer(organizationAuthenticationServerRequest: OrganizationAuthenticationServerRequest, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json'}): Observable<any> {
        if (super.configuration === undefined || super.configuration.accessToken === undefined || super.configuration.accessToken === null) {
          super.setupAccessTokenInAPIService();
        }
        if (organizationAuthenticationServerRequest === null || organizationAuthenticationServerRequest === undefined) {
            throw new Error('Required parameter organizationAuthenticationServerRequest was null or undefined when calling getUserInfoFromAuthServer.');
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

        return this.httpClient.post<Array<OrganizationAuthenticationServerInformation>>(`${this.configuration.basePath}/authenticationserver/userinformation`,
            organizationAuthenticationServerRequest,
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
