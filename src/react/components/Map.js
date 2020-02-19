import { forEach, isEmpty, isNil } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import leaflet from 'leaflet'

import './Map.scss'

function Map({ markers, observedUserLocation }) {
    const mapRef = useRef(null);
    const [centerPosition] = useState({ lat:42.6944, lng:23.3328  });

    useEffect(() => {
        mapRef.current = leaflet.map('map', {
            center: centerPosition,
            zoom: 10,
            layers: [
                leaflet.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });
    }, [centerPosition]);

    useEffect(() => {
        if(!isEmpty(markers)) {
            forEach(markers, marker => leaflet.marker([marker.lat, marker.lon]).addTo(mapRef.current));
        }
    }, [markers]);

    useEffect(() => {
        if (isNil(observedUserLocation)) {
            locateUser()
        } else {
            const { lat, lon } = observedUserLocation;
            mapRef.current.setView([lat, lon], 11, { animation: true });
        }
    }, [observedUserLocation]);

    const locateUser = () => mapRef.current.locate({ setView: true, maxZoom: 14});
    const onLocationFound = ({ accuracy, latlng }) => {
        const radius = accuracy / 2;

        leaflet.marker(latlng).addTo(mapRef.current);
        leaflet.circle(latlng, radius).addTo(mapRef.current);
    };


    useEffect(() => {
        mapRef.current.on('locationfound', onLocationFound);
        locateUser()
    }, []);

    return <div id="map" />
}

export default Map;
