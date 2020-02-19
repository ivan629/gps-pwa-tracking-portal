const USER_LOCATION_DETECTION_TIMOUT = 5000;

const store = {
    isDetection: false
};

const toggleDetection = () => {
    store.isDetection = !store.isDetection;
};

const YOUR_ACCESS_KEY = '7e6d0160d3e3ccdffb4d3658d3ad9024';

const fetchUpdateUserPosition = async () => {
    if (store.isDetection) {
        // const ipAddressResponse = await fetch('https://api.ipify.org/?format=json');
        // const { ip: ipAddress } = await ipAddressResponse.json();

        const geoLocationsResponse = await fetch(`http://api.ipapi.com/check?access_key=${YOUR_ACCESS_KEY}`, {
            "method": "GET"
        });

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

