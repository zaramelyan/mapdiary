import React from 'react';
import {Marker} from 'react-map-gl';
import CityPin from '../components/CityPin'

export default class Markers extends React.Component {
    render() {
      const {data, name, id} = this.props;
      
      return data.map(
        city => <Marker key={city[city]} longitude={city[0]} latitude={city[1]} ><CityPin onClick={() => console.log(name, id)} /></Marker>
      )
    }
    
    
  }