import { isNil } from 'lodash';
import React from 'react';

import store from '../store';

import { firebaseService } from './firebaseService'
import worker from 'workerize-loader!../../redux/workers/worker.js'; // eslint-disable-line import/no-webpack-loader-syntax

import { CURRENT_USER_POSITION_SET } from '../actions/locationDetectionActions';


class LocationDetectionService {
    constructor() {
        this.workerInstance = worker();
        this.updatePosition = (position) => store.dispatch({ type: CURRENT_USER_POSITION_SET, payload: position })
    }

    startLocationDetection() {
        this.workerInstance.addEventListener('message', async ({ data }) => {
            if (!isNil(data.lat) && !isNil(data.lon)) {
                await firebaseService.handlePositionSet({ lat: data.lat, lon: data.lon });
            }
        });

        this.workerInstance.startDetection();
    }

    async stopLocationDetection() {
        this.workerInstance.stopDetection();
    }
}

export default LocationDetectionService;
