import { isNil, isEmpty } from 'lodash';
import { takeLatest, select, put } from 'redux-saga/effects';

import { locationDetectionService } from '../../services/locationDetectionService';
import { firebaseService } from '../../services/firebaseService';

import { setNewObservedUser, LOCATION_MONITORING_TOGGLE, CURRENT_USER_POSITION_SET, USER_OBSERVED_ON_CHANGE } from '../../actions/locationDetectionActions'


function* handleLocationDetectionToggle({ payload }) {
    if (payload) {
        yield locationDetectionService.startLocationDetection();
    } else {
        yield locationDetectionService.stopLocationDetection();
    }
}

function* handleCurrentUserPositionUpdate({ payload }) {
    yield firebaseService.handlePositionSet(payload)
}

function* handleObservedUserChange() {
    const state = yield select();
    const { observedUserIndex, usersLocations } = state.locationMonitoring;
    let newObservedUserIndex = null;

    if (isEmpty(usersLocations)) {
        yield put(setNewObservedUser(newObservedUserIndex));

        return;
    }

    if (isNil(observedUserIndex)) {
        newObservedUserIndex = 0;
    } else {
        const newTestObservedUserIndex = observedUserIndex + 1;
        newObservedUserIndex = isNil(usersLocations[newTestObservedUserIndex]) ? null : newTestObservedUserIndex;
    }

    yield put(setNewObservedUser(newObservedUserIndex));
}

export default function* watchLocationDetectionSaga() {
    yield takeLatest(USER_OBSERVED_ON_CHANGE, handleObservedUserChange);
    yield takeLatest(LOCATION_MONITORING_TOGGLE, handleLocationDetectionToggle);
    yield takeLatest(CURRENT_USER_POSITION_SET, handleCurrentUserPositionUpdate);
}
