
import { Inject, Injectable, Optional }                      from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent, HttpParameterCodec, HttpErrorResponse
} from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import {Observable, throwError} from 'rxjs';

import { OrganizationAccess } from '../model/models';
import { PlaceAccess } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import {catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  /**
   * The URL of the server( and the databases) -> IP:port
   */
  protected basePath = 'https://backend.stalker-qb.team:8080';
  //protected basePath = 'https://2.234.128.81:8080';
  /**
   *  Http Header for http request
   */
  public defaultHeaders = new HttpHeaders();
  /**
   * Token firebase
   */
  public configuration = new Configuration();

  public encoder: HttpParameterCodec;

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
      this.configuration.accessToken = localStorage.getItem('adminToken');
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }


  setupAccessTokenInAPIService() {
    this.configuration.accessToken = localStorage.getItem('adminToken');
  }


  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object") {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key,
            (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }
}
