import { createSelector } from 'reselect';

export const getMarkers = createSelector(
    [
        state => state.locationMonitoring.usersLocations
    ],
    (usersLocations) => usersLocations
);

export const getObservedUserLocation = createSelector(
    [
        state => state.locationMonitoring.observedUserIndex,
        state => getMarkers(state)
    ],
    (observedUserIndex, allUserLocations) => {
        return observedUserIndex > 0 ? null : allUserLocations[observedUserIndex];
    }
);
