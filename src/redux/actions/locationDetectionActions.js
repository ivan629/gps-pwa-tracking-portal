import { createAction } from 'redux-actions';

export const USERS_DATA_SET = 'USERS_DATA_SET';
export const WEB_WORKER_SET = 'WEB_WORKER_SET';
export const SET_MAP_REFERENCE = 'SET_MAP_REFERENCE';
export const UNIQUE_USER_ID_SET = 'UNIQUE_USER_ID_SET';
export const NEW_USER_OBSERVED_SET = 'NEW_USER_OBSERVED_SET';
export const USER_OBSERVED_ON_CHANGE = 'USER_OBSERVED_ON_CHANGE';
export const CURRENT_USER_POSITION_SET = 'CURRENT_USER_POSITION_SET';
export const LOCATION_MONITORING_TOGGLE = 'LOCATION_MONITORING_TOGGLE';

export const setNewObservedUser = createAction(NEW_USER_OBSERVED_SET);
export const switchObservedUser = createAction(USER_OBSERVED_ON_CHANGE);
export const setWebWorker = createAction(WEB_WORKER_SET);
export const setMapReference = createAction(SET_MAP_REFERENCE);
export const toggleLocationMonitoring = createAction(LOCATION_MONITORING_TOGGLE);
