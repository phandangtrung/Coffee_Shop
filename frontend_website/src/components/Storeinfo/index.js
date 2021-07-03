import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";
import Mapstore from "../Maps/Maps";
import { Images } from "../../config/image";
import MapGL from "react-map-gl";
import productApi from "../../api/productApi";
import axios from "axios";
import ReactMapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";
const Storeinfo = () => {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2txZmI3cDl5MG42ODJvc2N1emRqcndqYyJ9.-QdtnY-bLP8PSXMwwXuQEA";
  const [viewport, setViewport] = React.useState({
    latitude: 10.80736046887542,
    longitude: 106.75393921417468,
    zoom: 9,
  });
  const [showPopup, togglePopup] = React.useState(false);
  const [locapopup, setlocapopup] = useState({
    latitude: 10.850753003313997,
    longitude: 106.77191156811507,
  });
  const [locateBrL, setlocateBrL] = useState([
    {
      latitude: 10.850753003313997,
      longitude: 106.77191156811507,
      location: "",
    },
  ]);
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };
  const mapRef = useRef();
  const fetchbrach = async () => {
    try {
      const response = await productApi.getBranch();
      console.log("Fetch branch succesfully: ", response);
      getlocate(response.branches);
    } catch (error) {
      console.log("failed to fetch order: ", error);
    }
  };
  const getlocate = (brL) => {
    let brlocaList = [];
    brL.map((branchI) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/"${branchI.location}".json?access_token=${MAPBOX_TOKEN}`
        )
        .then(function (responseloca) {
          const bloca = {
            latitude: responseloca.data.features[0].center[1],
            longitude: responseloca.data.features[0].center[0],
            location: branchI.location,
          };
          brlocaList.push(bloca);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    console.log(">>brlocaList", brlocaList);
    setlocateBrL(brlocaList);
  };
  useEffect(() => {
    fetchbrach();
  }, []);
  return (
    <div className="container">
      <div className="store__info-form">
        <div className="best__seller-title " style={{ width: "10%" }}>
          Store
        </div>
        <div className="info_form">
          <div className="info_content">
            <div className="content_text">
              <div className="title">CHI NHÁNH THE COFFEE SHOP</div>
              <br />
              <div className="discription">
                {locateBrL.map((lb) => (
                  <div
                    style={{
                      paddingBottom: 20,
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setViewport({
                        ...viewport,
                        latitude: lb.latitude,
                        longitude: lb.longitude,
                        zoom: 14,
                      });
                      setlocapopup({
                        latitude: lb.latitude,
                        longitude: lb.longitude,
                        location: lb.location,
                      });
                      togglePopup(true);
                    }}
                  >
                    {`-> ${lb.location}`}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="info_img">
            <MapGL
              {...viewport}
              ref={mapRef}
              width="100%"
              height="100%"
              onViewportChange={setViewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              // onClick={onMapClick}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              <GeolocateControl
                style={geolocateControlStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                // auto
                // onGeolocate={testhan}
                label="Vị trí của tôi"
              />
              {showPopup && (
                <Popup
                  latitude={locapopup.latitude}
                  longitude={locapopup.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => togglePopup(false)}
                  anchor="top-right"
                >
                  <div>{locapopup.location}</div>
                </Popup>
              )}
              {locateBrL.map((lc) => (
                <Marker
                  latitude={lc.latitude}
                  longitude={lc.longitude}
                  offsetLeft={-20}
                  offsetTop={-30}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setlocapopup({
                        latitude: lc.latitude,
                        longitude: lc.longitude,
                        location: lc.location,
                      });
                      togglePopup(true);
                    }}
                    style={{ height: 40, width: 18 }}
                    src={Images.LOCATE}
                  />
                </Marker>
              ))}
            </MapGL>
          </div>
        </div>
        {/* <div className="map-form">
          <div>
            <Mapstore />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Storeinfo;
