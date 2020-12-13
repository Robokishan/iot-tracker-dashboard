import React from 'react'
import L from 'leaflet'
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import Styles from './GoogleMap.module.css'
import { BoxZoomControl } from 'react-leaflet-box-zoom'
class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, centerMarker: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  onMarkerClick(e) {
    this.setState({ centerMarker: [e.latlng.lat, e.latlng.lng] })
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  static defaultProps = {
    center: {
      lat: 23.0225,
      lng: 72.5714
    },
    zoom: 20
  };

  openPopup(marker) {
    if (marker && marker.leafletElement && marker.showme) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup()
      })
    }
  }

  render() {
    var myIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
      // iconUrl:iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41],
    });
    const MyMarker = props => {
      var initMarker = ref => {
        if (ref) {
          ref.leafletElement.openPopup()
        }
      }
      // console.log(props.showPopup)
      if (props.showPopup !== true)
        initMarker = null
      return <Marker ref={initMarker} {...props} />
    }
    var markers = [];
    var bounds = [];
    try {
      markers = this.props.markers ? this.props.markers.map(marker => (
        marker.payload.d ?
        <MyMarker
          key={marker.asset_username}
          ref={this.openPopup}
          showPopup={marker.show}
          onMouseOver={(e) => {
            e.target.openPopup();
          }}
          onClick={(e) => {
            this.onMarkerClick(e);
          }}
          icon={myIcon}
          position={[marker.payload.d.lat, marker.payload.d.lon]}  >
          <Popup >
            { marker.show_marker ? marker.show_marker: marker.asset_name}
          </Popup>
        </MyMarker> : null
      )) : null;
      bounds = this.props.markers ? this.props.markers.map(marker => (
        [marker.payload.d.lat, marker.payload.d.lon]
      )) : null;
    }
    catch (error) {
      console.log(error);
    }

    // try {
    //   this.props.markers.map((marker,index)=>(
    // console.log(index,marker)
    //   )) 
    // } catch (error) {

    // }

    
    console.log("[GOOGLE MAP]", this.props.markers);

    bounds = this.props.bound == true ? bounds : null;
    var centerMarker = this.props.centerMarker ? this.props.centerMarker : [23.0225, 72.5714];
    if (this.state.centerMarker !== null) {
      centerMarker = this.state.centerMarker;
    }

    const circleFocus = <Circle
      center={{ lat: centerMarker[0], lng: centerMarker[1] }}
      color='red'
      fillColor='#f03'
      fillOpacity="0.5"
      radius={100} />
    return (
      <Map className={Styles["map-wrapper"]} center={centerMarker} bounds={bounds} maxZoom={19} zoom={15} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        {circleFocus}
        
      </Map>
    );
  }
}

export default GoogleMap;