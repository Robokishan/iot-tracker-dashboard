import React from "react";
import L from "leaflet";
import Styles from './GoogleMap.module.css'

import { BoxZoomControl } from 'react-leaflet-box-zoom'
 
// props : { markersData={markersData} bounds={bounds}  }
// {
//   title: +lastMarker.title + 1,
//   popup: "hi",
//   latLng: {
//     lat: lastMarker.latLng.lat + 0.0001,
//     lng: lastMarker.latLng.lng + 0.0001
//   }
// }

// bounds: [
//   [lastMarker.latLng.lat + 0.0002, lastMarker.latLng.lng + 0.0002]
// ]

class GoogleMap extends React.Component {



  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [0, 0],
      zoom: 1,
      maxZoom: 18,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    // add layer
    this.layer = L.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.markersData);
  }
  componentDidUpdate({ markersData, centerMarker }) {
    
    // check if data has changed
    console.log("componentDidUpdate",markersData)
    if (this.props.markersData !== markersData) {
      this.updateMarkers(this.props.markersData);
    }
    console.log("this.props.center",this.props.centerMarker)
    if (this.props.centerMarker!= centerMarker) {
      try {
        if(this.props.centerMarker != null)
        this.map.panTo(new L.LatLng(this.props.centerMarker[0], this.props.centerMarker[1]));  
      } catch (error) {
        if(process.env.NODE_ENV != 'production')
          console.log(error)
      }
      
    }
  }


  formatData (markers){
    var bounds = []
    try {
      if(markers.length) {
        markers.map((marker)=>{
          if(marker.payload.d != null) {
            console.log(marker.payload.d.lat)
            let mark = [marker.payload.d.lat+0.0001, marker.payload.d.lon+0.0001]
            console.log(mark)
            bounds.push(mark)
          }
        })
      }
      console.log("new bounds",bounds)
        return bounds
    } catch (error) {
      
    }
    
  }

  updateMarkers(markersData) {
    var myIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
      // iconUrl:iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41],
    });
    console.log("this.props.bounds", this.props.bounds);
    console.log("markersdata", markersData);
    try {
      var bounds = this.formatData(markersData)
    if (bounds.length > 0) this.map.fitBounds(bounds);  
    } catch (error) {
      
    }
    
    

    this.layer.clearLayers();
      if(markersData) {
      markersData.forEach(marker => {
        
        if(marker?.payload?.d?.lat){
          let mark = L.marker([marker.payload.d.lat, marker.payload.d.lon],{icon: myIcon}, { title: marker.title }).addTo(
            this.layer
          )
          if (marker.show_marker) {
            mark.bindPopup(marker.show_marker).openPopup();
            // var popup =  L.popup()
            // .setLatLng(latlng)
            // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
            // .openOn(marker);
            // mark.on('mouseover', function(e) {
            //   //open popup;
            //   console.log(e)
            //   var popup = L.popup()
            //    .setLatLng([marker.payload.d.lat, marker.payload.d.lon]) 
            //    .setContent(marker.show_marker)
            //    .openOn(this.map);
            // });
          }
        }
        else{
          console.error("MARKER NOT FOUND",marker)
        }
        
      }); 
    }
      
  }
  render() {
    return <div className={Styles["map-wrapper"]} id="map">
      
    </div>;
  }
}

export default GoogleMap;
