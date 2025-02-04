/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthPerformedWorkDto } from '../../models/auth-performed-work-dto';

export interface GetWorkByIdAndByEngineerAuthId$Params {
  performedWorkId: number;
}

export function getWorkByIdAndByEngineerAuthId(http: HttpClient, rootUrl: string, params: GetWorkByIdAndByEngineerAuthId$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthPerformedWorkDto>> {
  const rb = new RequestBuilder(rootUrl, getWorkByIdAndByEngineerAuthId.PATH, 'get');
  if (params) {
    rb.path('performedWorkId', params.performedWorkId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthPerformedWorkDto>;
    })
  );
}

getWorkByIdAndByEngineerAuthId.PATH = '/api/v1/performed-works/my-performed-work/{performedWorkId}';
