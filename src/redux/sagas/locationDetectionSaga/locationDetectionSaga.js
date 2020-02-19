import { takeLatest, select } from 'redux-saga/effects';

import LocationDetectionService from '../../services/locationDetectionService';
import { firebaseService } from '../../services/firebaseService';

import { LOCATION_MONITORING_TOGGLE, CURRENT_USER_POSITION_SET } from '../../actions/locationDetectionActions'

const LocationService = new LocationDetectionService();


function* handleLocationDetectionToggle({ payload }) {
    if (payload) {
        yield LocationService.startLocationDetection();
    } else {
        yield LocationService.stopLocationDetection();
    }
}

function* handleCurrentUserPositionUpdate({ payload }) {
    yield firebaseService.handlePositionSet(payload)
}

export default function* watchLocationDetectionSaga() {
    yield takeLatest(LOCATION_MONITORING_TOGGLE, handleLocationDetectionToggle);
    yield takeLatest(CURRENT_USER_POSITION_SET, handleCurrentUserPositionUpdate);
}
