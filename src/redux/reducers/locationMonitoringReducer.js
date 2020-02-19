import { isNil } from 'lodash';
import {
  USERS_DATA_SET,
  WEB_WORKER_SET,
  UNIQUE_USER_ID_SET,
  USER_OBSERVED_CHANGE,
  CURRENT_USER_POSITION_SET,
  LOCATION_MONITORING_TOGGLE
} from '../actions/locationDetectionActions';



const DEFAULT_OBSERVED_USER_ID = 1;

const initialState = {
  webWorker: null,
  uniqueUserId: null,
  observedUserIndex: DEFAULT_OBSERVED_USER_ID,
  currentUserPosition: null,
  isLocationMonitoring: false,
  usersLocations: []
};

export const locationMonitoringReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_MONITORING_TOGGLE:
      return {
        ...state,
        isLocationMonitoring: action.payload
      };

    case USERS_DATA_SET:
      return {
        ...state,
        usersLocations: action.payload
      };

    case UNIQUE_USER_ID_SET:
      return {
        ...state,
        uniqueUserId: action.payload
      };

    case WEB_WORKER_SET:
      return {
        ...state,
        webWorker: action.payload
      };

   case CURRENT_USER_POSITION_SET:
        return {
          ...state,
          currentUserPosition: action.payload
        };

    case USER_OBSERVED_CHANGE:
      const observedUserIndex = !isNil(state.usersLocations[state.observedUserIndex + 1])
      ? state.usersLocations.indexOf(state.usersLocations[state.observedUserIndex + 1])
      : -1;

      return {
        ...state,
        observedUserIndex
      };

    default:
      return {
        ...state
      }
  }
};
