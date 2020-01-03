import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Classification } from './../models/classification.model';

export const ADD_CLASSIFICATION     = '[CLASSIFICATION] Add';
export const REMOVE_CLASSIFICATION  = '[CLASSIFICATION] Remove';
export const UPDATE_CLASSIFICATION = '[CLASIFICATION] Update';


export class AddClassification implements Action {
    readonly type = ADD_CLASSIFICATION;

    constructor( public payload: Classification) {}
}

export class RemoveClassification implements Action {
    readonly type = REMOVE_CLASSIFICATION;

    constructor( public payload: number) {
        // the payload param should come from persistent data store
    }
}

export class UpdateClassification implements Action {
    readonly type = UPDATE_CLASSIFICATION;

    constructor( public payload: Classification) {
        // the payload param should come from persistent data store
    }
}
export type Actions =
 | AddClassification
 | RemoveClassification
 | UpdateClassification;
