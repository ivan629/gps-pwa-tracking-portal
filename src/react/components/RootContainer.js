import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getMarkers, getObservedUserLocation } from '../../redux/selectors/map.selectors';
import { toggleLocationMonitoring, switchObservedUser, setWebWorker } from '../../redux/actions/locationDetectionActions'

import Map from './Map';
import Controls from './Controls';

function RootContainer(props) {
    return (
        <Fragment>
            <Map markers={props.markers} observedUserLocation={props.observedUserLocation} />
            <Controls
                setWorker={props.setWorker}
                changeObservedUser={props.changeObservedUser}
                toggleLocationMonitor={props.toggleLocationMonitor}
                isLocationMonitoring={props.isLocationMonitoring}
            />
        </Fragment>
    )
}

RootContainer.propTypes = {};

const mapStateToProps = state => ({
    isLocationMonitoring: state.locationMonitoring.isLocationMonitoring,
    observedUserLocation: getObservedUserLocation(state),
    markers: getMarkers(state)
});

export default connect(mapStateToProps, {
    setWorker: setWebWorker,
    changeObservedUser: switchObservedUser,
    toggleLocationMonitor: toggleLocationMonitoring
})(RootContainer);

