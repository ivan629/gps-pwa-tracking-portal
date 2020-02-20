import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { toggleLocationMonitoring, switchObservedUser } from '../../redux/actions/locationDetectionActions'

import { locationDetectionService } from '../../redux/services/locationDetectionService';

import './Controls.scss'


function Controls({ isLocationMonitoring }) {
    const dispatch = useDispatch();

    useEffect(() => {
            const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

            if (isMobile) {
                document.addEventListener('visibilitychange', async () => {
                    if (document.visibilityState === 'hidden') {
                        await dispatch(toggleLocationMonitoring(false));
                    }
                });
            } else {
                window.addEventListener("beforeunload", () => locationDetectionService.stopLocationDetection())
            }
        }
    , []);

    return (
        <div className="controls">
            <Button className="controlButton toggleDetectionButton"
                variant="outlined"
                onClick={() => dispatch(toggleLocationMonitoring(!isLocationMonitoring))}>
                {`${isLocationMonitoring ? 'stop' : 'start'} detection`}
            </Button>
            <Button className="controlButton switchFocusButton" variant="outlined"
                onClick={() => dispatch(switchObservedUser())}>
                switch focus
            </Button>
        </div>
    )
}

export default Controls;
