import { isNil } from 'lodash';
import React from 'react';
import geolocator from 'geolocator';

import store from '../store';

import { firebaseService } from './firebaseService';

const POSITION_DETECTION_TIMEOUT = 2000;


class LocationDetectionService {
    constructor() {
        this.options = {
            enableHighAccuracy: true,
            desiredAccuracy: 30,
            timeout: 5000,
            maximumWait: 60000,
            maximumAge: 0,
            fallbackToIP: true,
            addressLookup: true,
            timezone: true
        };

        this.allUsersDetectionTimeoutId = null;
        this.currentUserDetectionTimeoutId = null;

        geolocator.config({
            language: "en",
            google: {
                version: "3",
                key: "AIzaSyAWQ8iRopFMgVSsyQxxKrnrGxh3YGGR3Qs"
            }
        });
    }

    get isLocationMonitoring() {
        return store.getState().locationMonitoring.isLocationMonitoring;
    }

    startLocationDetection() {
        this.detectUserLocation();
        this.detectAllUsersLocationDetection();
    }

    detectAllUsersLocationDetection() {
        if(!this.isLocationMonitoring) {
            return;
        }

        this.allUsersDetectionTimeoutId = setTimeout(async () => {
            await firebaseService.setAllUsersData();
            this.detectAllUsersLocationDetection()
        }, POSITION_DETECTION_TIMEOUT);
    }

    detectUserLocation() {
        if(!this.isLocationMonitoring) {
            return;
        }

        geolocator.locate(this.options, async (err, location) => {
            const { latitude: lat, longitude: lon } = location.coords;

            await firebaseService.handlePositionSet({ lat, lon });
            this.currentUserDetectionTimeoutId = setTimeout(
                () => this.detectUserLocation(),
                POSITION_DETECTION_TIMEOUT
            );

            if(!isNil(err)) {
                console.log(err);
            }
        });
    }

    async stopLocationDetection() {
        clearTimeout(this.allUsersDetectionTimeoutId);
        clearTimeout(this.currentUserDetectionTimeoutId);
        await firebaseService.clearCurrentUserPositionHistory();
    }
}

export const locationDetectionService = new LocationDetectionService();
