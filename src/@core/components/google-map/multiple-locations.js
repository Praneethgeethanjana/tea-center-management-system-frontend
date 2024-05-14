import React, { useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "@configs/constant";
import IMG from "../../../assets/images/logo/tea-leaf-44.png";

let center = {
  lat: 52.62746051737441,
  lng: -1.649065424693691,
};
function MultipleLocations({
  style,
  locationsData,
  isRouteView,
  zoom,
  centerObj,
  viewAll,
}) {
  // const [mapRef, useMapRef] = React.useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const locations = [];

  locationsData.map((ob) => {
    locations.push({
      lat: ob.position.lat,
      lng: ob.position.lng,
    });
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(centerObj);
    // map.fitBounds(bounds);
    // setMap(map);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!viewAll && !centerObj) {
      let obj = {
        lat: locationsData[0].position.lat,
        lng: locationsData[0].position.lng,
      };
      center = obj;
    }
  }, [locationsData]);

  useEffect(() => {
    if (viewAll && isLoaded && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.lat, location.lng)
        );
      });
      const center = {
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      };
      if (map) {
        map?.setCenter(center);
      }
      map?.fitBounds(bounds);
    }
  }, [isLoaded, locations, map]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     // const directionsService = new window.google.maps.DirectionsService();
  //     // const directionsRenderer = new window.google.maps.DirectionsRenderer();
  //     // if (map && isRouteView) {
  //     //   directionsRenderer.setMap(map);
  //     //   const waypoints = locationsData.map((location) => ({
  //     //     location: location.position,
  //     //   }));
  //     //   const origin = waypoints[0].location;
  //     //   const destination = waypoints[waypoints.length - 1].location;
  //     //
  //     //   const request = {
  //     //     origin: origin,
  //     //     destination: destination,
  //     //     waypoints: waypoints.slice(1, waypoints.length - 1),
  //     //     optimizeWaypoints: true,
  //     //     travelMode: "DRIVING",
  //     //   };
  //     //
  //     //   directionsService.route(request, (result, status) => {
  //     //     if (status === "OK") {
  //     //       directionsRenderer.setDirections(result);
  //     //     }
  //     //   });
  //     // }
  //   }
  // }, [isLoaded, map]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={style ? style : containerStyle}
      center={centerObj ? centerObj : center}
      zoom={zoom ?? 15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {isRouteView && (
        <Polyline
          path={locations}
          options={{ strokeColor: "#000000", strokeWeight: 4 }}
        />
      )}

      {locationsData.map((location, index) => {
        if (isRouteView) {
          if (index === 0 || index === locationsData.length - 1)
            return (
              <Marker
                key={index}
                icon={{
                  url: null,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
                position={location.position}
                label={{
                  text:
                    index === 0
                      ? "Start"
                      : index === locationsData.length - 1
                      ? "End"
                      : location.name,
                  className: "map-marker-label",
                }}
              />
            );
        } else {
          return (
            <Marker
              key={index}
              icon={IMG}
              position={location.position}
              label={{
                text: location.name,
                className: "map-marker-label",
              }}
            />
          );
        }
      })}
    </GoogleMap>
  ) : null;
}

export default React.memo(MultipleLocations);
