import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestParams } from '../models/RequestParams';
import { Properties } from '../../properties';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  /**
      * Generate headers to request
      * @return {Headers} headers of the request
      */
     get headers(): HttpHeaders {
      const accessToken = sessionStorage.getItem('accessToken') ? atob(sessionStorage.getItem('accessToken')) : null;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      if (accessToken !== null) {
        headers = headers.set('X-Auth-token', accessToken);
      }
      return headers;
    }

    /**
       * GET request function
       * @param uri  resource of the request
       * @param pParams.queryParams queryParams
       * @param pParams.requestOptions add headers to the request
       * @param pParams.responseType type to accept into response
       */
    get(pUri: string, pParams?: RequestParams, pRequestOptions?: any, pResponseType?: any): Promise<any> {
      let options;
      pParams = pParams || {};
      options = pParams.requestOptions ? Object.assign(options, pParams.requestOptions) : '';
      pParams.responseType = pParams.responseType ? pParams.responseType : 'json';
      pUri = pParams.externalEndpoint ? pUri : Properties.baseUrl.concat(pUri);

      return new Promise((resolve, reject) => {
        this.http.get(pUri, { headers: options, params: pParams.queryParams, responseType: pParams.responseType })
          .subscribe(
            response => resolve(response),
            err => {
              reject(err);
            });
      });
    }

    /**
       * POST request function
       * @param uri  resource of the request
       * @param pParams.queryParams queryParams
       * @param pParams.data body of the request
       * @param pParams.requestOptions add headers to the request
       * @param pParams.responseType type to accept into response
       */
    post(pUri: string, pParams?: RequestParams): Promise<any> {
      let options: HttpHeaders;

      pParams = pParams || {};
      pParams.data = pParams.data ? pParams.data : {};
      options = pParams.requestOptions ? Object.assign(options, pParams.requestOptions) : '';
      pParams.responseType = pParams.responseType ? pParams.responseType : 'json';
      pUri = pParams.externalEndpoint ? pUri : Properties.baseUrl.concat(pUri);

      if (pParams.data.constructor.name === 'FormData') {
        options = options.delete('Content-Type', '');
      }

      return new Promise((resolve, reject) => {
        this.http.post(pUri, pParams.data, { headers: options, params: pParams.queryParams, responseType: pParams.responseType })
          .subscribe(
            response => resolve(response),
            err => {
              reject(err);
            });
      });
    }

    /**
       * PUT request function
       * @param uri  resource of the request
       * @param pParams.queryParams queryParams
       * @param pParams.data body of the request
       * @param pParams.requestOptions add headers to the request
       * @param pParams.responseType type to accept into response
       */
    put(pUri: string, pParams?: RequestParams): Promise<any> {
      let options: HttpHeaders;

      pParams = pParams || {};
      pParams.data = pParams.data ? pParams.data : {};
      pParams.queryParams = pParams.queryParams ? pParams.queryParams : null;
      options = pParams.requestOptions ? Object.assign(options, pParams.requestOptions) : '';
      pParams.responseType = pParams.responseType ? pParams.responseType : 'json';
      pUri = pParams.externalEndpoint ? pUri : Properties.baseUrl.concat(pUri);

      if (pParams.data.constructor.name === 'FormData') {
        options = options.delete('Content-Type', '');
      }

      return new Promise((resolve, reject) => {
        this.http.put(pUri, pParams.data, { headers: options, params: pParams.queryParams, responseType: pParams.responseType })
          .subscribe(
            response => resolve(response),
            err => {
              reject(err);
            });
      });
    }

    /**
       * DELETE request function
       * @param uri  resource of the request
       * @param pParams.queryParams queryParams
       * @param pParams.requestOptions add headers to the request
       * @param pParams.responseType type to accept into response
       */
    delete(pUri: string, pParams?: RequestParams, pRequestOptions?: any, pResponseType?: any): Promise<any> {
      let options: HttpHeaders;

      pParams = pParams || {};
      options = pParams.requestOptions ? Object.assign(options, pParams.requestOptions) : '';
      pParams.responseType = pParams.responseType ? pParams.responseType : 'json';
      pUri = pParams.externalEndpoint ? pUri : Properties.baseUrl.concat(pUri);

      return new Promise((resolve, reject) => {
        this.http.delete(pUri, { headers: options, params: pParams.queryParams, responseType: pParams.responseType })
          .subscribe(
            response => resolve(response),
            err => {
              reject(err);
            });
      });
    }



}
