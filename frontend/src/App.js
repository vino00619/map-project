import * as React from 'react';
// import {useState} from 'react';
// import ReactMapGL from "react-map-gl";
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


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
  return (
      <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapboxAccessToken = {process.env.REACT_APP_MAPBOX}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    />
  );
}
//finally
//finally//finally//finally//finally



export default App;
