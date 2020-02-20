import { forEach, isEmpty, isNil } from 'lodash';
import React, { useEffect, useRef, useState } from 'react'
import leaflet from 'leaflet'

import './Map.scss'

function Map({ markers, observedUserIndex }) {
    const mapRef = useRef(null);
    const [centerPosition] = useState({ lat:42.6944, lng:23.3328  });
    const [currentMarkersOnMap] = useState([]);

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
        forEach(currentMarkersOnMap, currentMarker => mapRef.current.removeLayer(currentMarker));

        if(!isEmpty(markers)) {
            forEach(markers, marker => {
                const newMarker = leaflet.marker([marker.lat, marker.lon]);
                currentMarkersOnMap.push(newMarker);

                newMarker.addTo(mapRef.current);
            });
        }
    }, [markers]);

    useEffect(() => {
        if (isNil(observedUserIndex)) {
            locateUser();
        } else {
            const { lat, lon } = markers[observedUserIndex];

            mapRef.current.setView([lat, lon], 14, { animation: true });
        }
    }, [observedUserIndex]);

    const locateUser = () => mapRef.current.locate({ setView: true, maxZoom: 14});
    const onLocationFound = ({ accuracy, latlng }) => {
        const radius = accuracy / 2;

        const myCustomColour = '#583470';

        const markerHtmlStyles = `
              background-color: ${myCustomColour};
              width: 1rem;
              height: 1rem;
              display: block;
              left: -0.5rem;
              top: 1rem;
              position: relative;
              border-radius: 2rem 2rem;
              transform: rotate(45deg);
              border: 1px solid #FFFFFF
             `;

        const icon = leaflet.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span style="${markerHtmlStyles}" />`
        });

        leaflet.marker(latlng, { icon }).addTo(mapRef.current);
        leaflet.circle(latlng, radius).addTo(mapRef.current);
    };


    useEffect(() => {
        mapRef.current.on('locationfound', onLocationFound);
        locateUser()
    }, []);

    return <div id="map" />
}

export default Map;
