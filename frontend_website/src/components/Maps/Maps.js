import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
function Mapstore(props) {
  const mapStyles = {
    // maxWidth: "1063px",
    // maxHeight: "250px",
  };

  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      //10.853406, 106.761516
      initialCenter={{ lat: props.lat, lng: props.lng }}
      center={{ lat: props.lat, lng: props.lng }}
      onClick={props.oncheck}
      // initialCenter={{ lat: positonn.lat, lng: positonn.lng }}
    >
      {/* 10.850899, 106.771948 */}
      <Marker
        title="Trung house"
        // position={{ lat: 10.850899, lng: 106.771948 }}
        position={{ lat: props.lat, lng: props.lng }}
      />
    </Map>
  );
}
// Mapstore.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_eKxh8KTsPy6aPPJPROh2yP75dTvg92o",
})(Mapstore);
