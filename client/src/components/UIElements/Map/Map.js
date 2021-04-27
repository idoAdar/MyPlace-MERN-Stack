import React, { useRef, useEffect } from 'react';
import './Map.css'

const Map = props => {
    const mapRef = useRef();

    useEffect(() => {
        const center = {
            lat: props.center.lat,
            lng: props.center.lng
        }
        
        // The map (google.maps.Map) constructor available from the Google Map CDN in the index.html file
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: props.zoom
        });
        new window.google.maps.Marker({position: center, map: map});
    }, [props]);

    return (
        <div ref={mapRef} className={'map'}></div>
    )
}

export default Map;