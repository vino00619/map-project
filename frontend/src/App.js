import * as React from "react";
import { useEffect, useState } from "react";
// import {useState} from 'react';
// import ReactMapGL from "react-map-gl";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";

// function App() {
//   const [viewport, setViewport] = useState({
//     width:400,
//     height: 400,
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });
//   return(
//     <div className='App'>
//       <ReactMapGL
//        {...viewport}
//        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
//        onViewportChange={nextViewport => setViewport(nextViewport)}
//        />
//     </div>
//   );
// }

function App() {
  const currentUser = "vinoth";
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        console.log(res.data);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    console.log("inside handle marker click");
    setCurrentPlaceId(id);
  };

  const handleAddClick = (e) => {
    // console.log(e);
    // console.log(e.lngLat);
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);
    setPins([
      ...pins,
      {
        lat,
        long: lng,
      },
    ]);
    setNewPlace({
      lat,
      lng,
    });
  };
  return (
    <Map
      initialViewState={{
        longitude: 7.36168,
        latitude: 46.77986,
        zoom: 4,
      }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onDblClick={handleAddClick}
    >
      {pins.map((p, index) => (
        <div key={index}>
          <Marker
            // longitude={2.294481}
            // latitude={48.85837}
            longitude={p.long}
            latitude={p.lat}
            anchor="bottom"
            color="#b01227"
          >
            {/* <img src="./pin.png" alt="pin" /> */}
            <RoomIcon
              style={{
                fontSize: "2rem",
                color: p.username === currentUser ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup
              key={p._id}
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p>{p.desc}</p>
                <label>Rating</label>
                <div className="star">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <label>Information</label>
                <span className="username">
                  Created by <b>{p.username}</b>
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
          )}
        </div>
      ))}
      {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.lng}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="left"
        >
          Hello
        </Popup>
      )}
    </Map>
  );
}

export default App;
