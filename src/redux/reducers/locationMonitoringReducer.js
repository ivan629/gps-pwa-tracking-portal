import {
  USERS_DATA_SET,
  WEB_WORKER_SET,
  SET_MAP_REFERENCE,
  UNIQUE_USER_ID_SET,
  NEW_USER_OBSERVED_SET,
  CURRENT_USER_POSITION_SET,
  LOCATION_MONITORING_TOGGLE
} from '../actions/locationDetectionActions';


const initialState = {
  mapRef: null,
  webWorker: null,
  uniqueUserId: null,
  observedUserIndex: null,
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
      
      case SET_MAP_REFERENCE:
      return {
        ...state,
        mapRef: action.payload
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

    case NEW_USER_OBSERVED_SET:
      return {
        ...state,
        observedUserIndex: action.payload
      };

    default:
      return {
        ...state
      }
  }
};
