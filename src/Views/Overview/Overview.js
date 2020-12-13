import React from 'react'
import Styles from './Overview.module.css'
import GoogleMap from '../../Components/Map/v2/GoogleMap.js'
import axios from 'axios';
import { getToken, eraseAllvalues, getUserId } from '../../utils/storage'
import { Button, Input } from 'reactstrap';
import LoaderScreen from '../Loader/Loader';
import moment from 'moment'
require('dotenv').config()

class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            centerMarker: null,
            Loading: true
        }
        this.logout = this.logout.bind(this);
    }
    logout() {
        eraseAllvalues();
        this.props.history.push('/');
    }

    handleCenterChange(event) {
        // var center = JSON.parse(event.target.value);
        var center = this.state.data[event.target.value];
        this.state.data.map( (data,index) =>(
            data.show = (index == event.target.value ? true : false)
        ));
        if(center.payload.d) {
            this.setState({ centerMarker: [center.payload.d.lat, center.payload.d.lon] })
        }
    }

    async componentDidMount() {


        //[{"asset_id":"b3b8a780-4125-11ea-977c-0146afdde05c","added_on":"1580324351","payload":{"d":{"temp":23.44,"hum":73,"lat":23.01,"lon":25}},"asset_name":"esp32","asset_type":"wifi"},{"asset_id":"c2cdeea0-4126-11ea-aa76-6f73816bcde7","added_on":"1580327764","payload":{"d":{"temp":23.44,"hum":73,"lat":23.01,"lon":25}},"asset_name":"kitchen wifi","asset_type":"wifi"}]
        /* array:
            {
                asset_id: <id>,
                added_on:,
                payload:{
                    d:<data>
                }
                asset_name:<name>
                asset_type:<type>
            }
        */
        let token = getToken();
        let Headers = {
            'Authorization': "Bearer " + token
        }
        const request = {
            method: 'get',
            // url: `${process.env.REACT_APP_OVERVIEW_API}${getUserId()}/overview`,
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_OVERVIEW_API_PATH}`,
            headers: Headers
        }
        try {
            const response = await axios(request);
            console.log("Overview data", response.data);
            if (response.status !== 200) {
                this.logout();
            }
            var devices = []

            //data parser
            response.data.map((device) => {
                let data = {
                    asset_id : device.asset_id,
                    asset_name : device.asset_name,
                    asset_type : device.asset_type,
                    added_on : device.added_on,
                    payload  : device.payload,
                    asset_username: device.asset_username,
                    show_marker: `${device.asset_name} ${moment(device.added_on*1000).format("DD/MM/YYYY hh:mm A")}` 
                }
                devices.push(data);
            })

            //set in state
            if (devices.length > 0) {
                this.setState({ data: devices, Loading: false });
            }
            this.setState({ Loading: false });
            console.log("[OVERVIEW DEVICES]", devices);
        }
        catch (err) {
            //TODO:handle all the errors
            //logout if any error occured
            if(process.env.NODE_ENV == "production") {
                this.logout();   
            }
            else{
                console.log("NODE_ENV",process.env.NODE_ENV);
                console.log("[OVERVIEW ERROR]", err);
            }
        }
    }

    renderRoutes() {

        if (this.state.Loading === false) {
            var bounds = [];
            /* update center marker if null */
            if (this.state.centerMarker === null) {
                try {
                    var centerMarker = this.state.data ? [this.state.data[0].payload.d.lat, this.state.data[0].payload.d.lon] : null;
                    if (centerMarker !== null){
                        this.setState({ centerMarker: centerMarker });
                        this.state.data[0].show = true;
                    }
                } catch (error) {
                    console.log("[OVERVIEW RENDERROUTES]",error);
                }
            }
            var deviceList = [];
            try {
                deviceList = this.state.data ? this.state.data.map((device,index) => (<option key={device.asset_username} value={index}>{device.asset_name}</option>)) : null;
                if (this.state.data != null) {
                    this.state.data.map(device => (
                        device.payload.d ? bounds.push([device.payload.d.lat, device.payload.d.lon]) : null
                    ))
                }
            } catch (error) {
                console.log("[OVERVIEW RENDERROUTES deviceList]", error);
            }

            return (
                <div className={Styles["main-wrapper"]} >
                    <div className={Styles["header-wrapper"]}>
                        <Input className={Styles["deviceSelection"]} onChange={this.handleCenterChange.bind(this)} type="select" name="Device" id="CenterDeviceSelection">
                            {deviceList}
                        </Input>
                    </div>
                    <div className={Styles["content-wrapper"]}>
                        {/* bound={bounds}   */}
                        <GoogleMap centerMarker={this.state.centerMarker} markersData={this.state.data} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={Styles["wrapper"]}>
                    <div className={Styles["loaderscreen"]}>
                        <LoaderScreen />
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.renderRoutes()}
            </React.Fragment>
        );
    }
}

export default Overview;