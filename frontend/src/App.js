import * as React from 'react';
// import {useState} from 'react';
// import ReactMapGL from "react-map-gl";
import Map, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./app.css"


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
  const [showPopup, setShowPopup] = React.useState(true);
  return (
      <Map
        initialViewState={{
          longitude: 7.361680,
          latitude: 46.779860,
          zoom: 4
        }}
        mapboxAccessToken = {process.env.REACT_APP_MAPBOX}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
      <Marker longitude={2.294481} latitude={48.858370} anchor="bottom" color= "#b01227">
        {/* <img src="./pin.png" alt="pin" /> */}
        <RoomIcon style={{fontSize:"2rem"}}/>
      </Marker>
      {showPopup && (
      <Popup longitude={2.294481} latitude={48.858370}
        anchor="left"
        >
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>Eiffell Tower</h4>
          <label>Review</label>
          <p>Beautiful Place. I like it.</p>
          <label>Rating</label>
          <div className='star'><StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/></div>
          <label>Information</label>
          <span className='username'>Created by <b>vinoth</b></span>
          <span className='date'>1 hour ago</span>
        </div>
      </Popup>)}
      </Map>
  );
}
//finally



export default App;
