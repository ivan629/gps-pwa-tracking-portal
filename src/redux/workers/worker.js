const USER_LOCATION_DETECTION_TIMOUT = 5000;

const store = {
    isDetection: false
};

const toggleDetection = () => {
    store.isDetection = !store.isDetection;
};

const fetchUpdateUserPosition = async () => {
    if (store.isDetection) {
        const geoLocationsResponse = await fetch('https://get.geojs.io/v1/ip/geo.json');

        const { latitude, longitude } = await geoLocationsResponse.json();

        postMessage({ lat: latitude, lon: longitude });
        setTimeout(() => fetchUpdateUserPosition(), USER_LOCATION_DETECTION_TIMOUT);
    }
};

export const startDetection = async () =>  {
    toggleDetection();
    await fetchUpdateUserPosition();
};

export const stopDetection = () => toggleDetection();

