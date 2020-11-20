import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import googleMapStyles from "./googleMapStyles";
function Mapstore(props) {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  return (
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      //10.853406, 106.761516
      initialCenter={{ lat: 10.853406, lng: 106.761516 }}
    >
      {/* 10.850899, 106.771948 */}
      <Marker position={{ lat: 10.850899, lng: 106.771948 }} />
    </Map>
  );
}
Mapstore.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_eKxh8KTsPy6aPPJPROh2yP75dTvg92o",
})(Mapstore);
