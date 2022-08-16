import * as React from "react";
import { useEffect, useState, useRef } from "react";
// import {useState} from 'react';
// import ReactMapGL from "react-map-gl";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "mapbox-gl/dist/mapbox-gl.css";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

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
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [Desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const[showRegister, setShowRegister] = useState(false);
  const[showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 7.36168,
    latitude: 46.77986,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins");
        // console.log(res.data);
        setPins(res.data);
        // console.log(res.data);
        console.log("res data:", res.data);
        const arr_star = res.data.map((data) => data.rating);
        // console.log("b:", arr_star);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const mapRef = useRef();

  const handleMarkerClick = (id, lat, long) => {
    // console.log("inside handle marker click");
    // console.log("lat:" + lat, "long:" + long);
    // console.log(viewState);
    setCurrentPlaceId(id);
    // setViewState({ ...viewState, latitude: lat, longitude: long });
    mapRef.current?.flyTo({ center: [long, lat], duration: 2000 });
  };

  const handleAddClick = (e) => {
    // console.log(e);
    // console.log(e.lngLat);
    const { lng, lat } = e.lngLat;
    // console.log(lng, lat);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      Desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };
    console.log("newpin:", newPin);

    try {
      const res = await axios.post("http://localhost:8800/api/pins", newPin);
      setPins([...pins, res.data]);
      // console.log("here", res.data);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  const user = myStorage.getItem("user");

  return (
    <div>
      <Map
        ref={mapRef}
        // initialViewState={{
        //   longitude: 7.36168,
        //   latitude: 46.77986,
        //   zoom: 4,
        // }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        // {user ? onDblClick={handleAddClick}:onDblClick={null}}
        onDblClick={user? handleAddClick:""}
        transition={9000}
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
                  {(Array(+(p.rating)).fill(<StarIcon/>))}
                  {/* {p.rating} */}
                    {/* {Array(p.rating).map(p.rating).fill(<StarIcon />)} */}
                    {/* {Array(p.rating).fill(<StarIcon />)} */}
                    {/* {Array(p.rating).fill(<StarIcon />)} */}
                    {/* {(p.map((data)=>data.rating)).fill(<StarIcon />)} */}
                    {/* <StarIcon /> */}
                    {/* {p.map((s) => s.rating.fill(<StarIcon />))} */}
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
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>Log out</button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={()=>setShowLogin(true)}>Login</button>
            <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
          </div>
        )}
      </Map>
      {showRegister && <Register setShowRegister={setShowRegister}/>}
      {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
      

    </div>
  );
}

export default App;
