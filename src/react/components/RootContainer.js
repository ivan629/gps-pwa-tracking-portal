import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { getMarkers } from '../../redux/selectors/map.selectors';

import Map from './Map';
import Controls from './Controls';

function RootContainer() {
    const props = useSelector(state => ({
        isLocationMonitoring: state.locationMonitoring.isLocationMonitoring,
        observedUserIndex: state.locationMonitoring.observedUserIndex,
        markers: getMarkers(state)
    }));

    return (
        <Fragment>
            <Map markers={props.markers} observedUserIndex={props.observedUserIndex} />
            <Controls isLocationMonitoring={props.isLocationMonitoring} />
        </Fragment>
    )
}

RootContainer.propTypes = {};

export default RootContainer;

