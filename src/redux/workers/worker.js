const USER_LOCATION_DETECTION_TIMOUT = 5000;

const store = {
    isDetection: false
};

const toggleDetection = () => {
    store.isDetection = !store.isDetection;
};

const fetchUpdateUserPosition = async () => {
    if (store.isDetection) {
        const response = await fetch('http://ip-api.com/json/');
        const { lat, lon } = await response.json();

        postMessage({ lat, lon });
        setTimeout(() => fetchUpdateUserPosition(), USER_LOCATION_DETECTION_TIMOUT);
    }
};

export const startDetection = async () =>  {
    toggleDetection();
    await fetchUpdateUserPosition();
};

export const stopDetection = () => toggleDetection();

