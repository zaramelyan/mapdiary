import React from 'react';
import './App.css';
import ReactMapGL, {NavigationControl, GeolocateControl, Marker} from 'react-map-gl';
import Entry from '../src/components/Entry';
import Markers from '../src/components/Markers'
import CityPin from '../src/components/CityPin'



const CITIES = [];


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     
        latitude: 0,
        longitude: 0,
        staticLat: 59.91273 ,
        staticLong: 10.74609,
        zoom: 1,
        entry: false,
        name: '',
        id: 0
      
  
    }
  }


  render() {
    const geolocateStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 10
    };

  var TOKEN = 'pk.eyJ1IjoiemFybWVsIiwiYSI6ImNrNmdqb2diNTBuMXUzbm1sc25sMzZ4dzkifQ.9MWYdG8O5cT8nIn7TiedYw'
  return (
    <div className="App">
      <div className="title">Map Diary</div>
      <div id="mappy" className="content">
        <ReactMapGL 
          mapboxApiAccessToken={TOKEN}
          width="100%"
          height="100%"
          mapStyle='mapbox://styles/mapbox/streets-v8'
          onViewportChange={(viewport) => {
            this.setState({latitude: viewport.latitude, longitude: viewport.longitude, zoom: viewport.zoom})
      
          }}
          onClick={(viewport) => {
            this.setState({staticLong: viewport.lngLat[0], staticLat: viewport.lngLat[1], entry: true})
            CITIES.push([this.state.staticLong, this.state.staticLat])
            console.log(viewport.lngLat)
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${viewport.lngLat[0]},${viewport.lngLat[1]}.json?access_token=${TOKEN}`)
            .then((res) => res.json())
            .then((myJson) => this.setState({name: myJson.features[0].place_name, id: myJson.features[0].id}))
            
          }}

          latitude={this.state.latitude}
          longitude={this.state.longitude}
          zoom={this.state.zoom}
         
          > <div style={{position: 'absolute', right: 0}}>
          <NavigationControl showCompass={false} />
        </div>
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      <Marker key={1} longitude={this.state.staticLong} latitude={this.state.staticLat}><CityPin onClick={() => console.log('hi')}/></Marker>
      <Markers data={CITIES} {...this.state}/>
        </ReactMapGL>
        <div className="entrybox">
        {this.state.entry ? <Entry {...this.state}/> : ''}
        </div>
        
      </div>
      <div className="foot">My foot</div>
    </div>
  );
  }
}

export default App;
