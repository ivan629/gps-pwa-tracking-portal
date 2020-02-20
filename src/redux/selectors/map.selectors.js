import { createSelector } from 'reselect';

export const getMarkers = createSelector(
    [
        state => state.locationMonitoring.usersLocations
    ],
    (usersLocations) => usersLocations
);
