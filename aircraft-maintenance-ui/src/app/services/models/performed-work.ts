/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { AircraftCheck } from '../models/aircraft-check';
import { Airplane } from '../models/airplane';
export interface PerformedWork {
  aircraftCheck?: AircraftCheck;
  airplane?: Airplane;
  completionDate?: string;
  createdBy?: string;
  createdDate?: string;
  description?: string;
  engineerId?: string;
  id?: number;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  result?: 'NORMAL' | 'EXCHANGE' | 'CRASH';
}
