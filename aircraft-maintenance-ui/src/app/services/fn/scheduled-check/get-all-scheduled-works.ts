/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseScheduledCheckDto } from '../../models/page-response-scheduled-check-dto';

export interface GetAllScheduledWorks$Params {
  page?: number;
  size?: number;
}

export function getAllScheduledWorks(http: HttpClient, rootUrl: string, params?: GetAllScheduledWorks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseScheduledCheckDto>> {
  const rb = new RequestBuilder(rootUrl, getAllScheduledWorks.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseScheduledCheckDto>;
    })
  );
}

getAllScheduledWorks.PATH = '/api/v1/scheduled-checks/all-scheduled-check';
