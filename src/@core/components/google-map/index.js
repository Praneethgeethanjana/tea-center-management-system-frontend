import React, { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "@configs/constant";

function MapComponent({ data, setData, farmer }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 52.62746051737441,
    lng: -1.649065424693691,
  };

  const [map, setMap] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState({
    lat: 52.62746051737441,
    lng: -1.649065424693691,
  });

  useEffect(() => {
    if (farmer) {
      setData({
        lat: parseFloat(farmer.latitude),
        lng: parseFloat(farmer.longitude),
      });
    } else {
      setData(selectedLocation);
    }
  }, []);

  const onSelect = (location) => {
    setSelectedLocation(location);
    setData(location);
  };
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        map
          ? map
          : data
          ? data
          : farmer
          ? {
              lat: parseFloat(farmer.latitude),
              lng: parseFloat(farmer.longitude),
            }
          : center
      }
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(e) => onSelect(e.latLng.toJSON())}
    >
      <Marker
        position={
          data
            ? data
            : driver
            ? {
                lat: parseFloat(farmer.latitude),
                lng: parseFloat(farmer.longitude),
              }
            : selectedLocation
        }
      />
      <></>
    </GoogleMap>
  ) : null;
}

export default React.memo(MapComponent);
