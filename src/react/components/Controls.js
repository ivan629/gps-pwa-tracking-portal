import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { firebaseService } from '../../redux/services/firebaseService';

import './Controls.scss'


function Controls({ toggleLocationMonitor, isLocationMonitoring, changeObservedUser }) {
    useEffect(() => {
        return () => firebaseService.clearCurrentUserPositionHistory()
    }, []);

    return (
        <div className="controls">
            <Button className="controlButton toggleDetectionbutton"
                variant="outlined"
                onClick={() => toggleLocationMonitor(!isLocationMonitoring)}>
                {`${isLocationMonitoring ? 'stop' : 'start'} detetion`}
            </Button>
            <Button className="controlButton switchFocusButton" variant="outlined"
            onClick={() => changeObservedUser()}>
            switch focus
            </Button>
        </div>
    )
}

export default Controls;
