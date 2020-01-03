import { Action } from '@ngrx/store';
import { Classification } from './../models/classification.model';
import * as ClassificationActions from './../actions/classification.actions';

const initialState: Classification = {
    letter: '',
    codes: ['C01B', 'C01D', 'C01C']
};

export function classReducer(
    state: Classification[] = [initialState],
    action: ClassificationActions.Actions) {
        switch ( action.type ) {
            case ClassificationActions.ADD_CLASSIFICATION:
                return {
                    ...state,
                    payload: action.payload
                };
            default:
                return state;
        }
    }