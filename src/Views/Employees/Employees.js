import React from 'react'
import GoogleMap from '../../Components/Map/v2/GoogleMap'
import axios from 'axios';
import { getToken, getUserId } from '../../utils/storage'
import { Button, Input, Form, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LoaderScreen from '../Loader/Loader'
import Styles from './Employees.module.css'
import moment from 'moment'
require('dotenv').config()

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            list: null,
            gte: "", //TODO : REMOVE
            lte: "", //TODO : REMOVE
            markers: null,
            Loading: false,
            mainLoader: true,
            bounds: [],
            showBound:false,
            noDatafound: false
        }
        this.onDatePickerChanger = this.onDatePickerChanger.bind(this);
    }

    async componentDidMount() {
        let token = getToken();
        let Headers = {
            'authorization': "Bearer " + token
        }
        const request = {
            method: 'get',
            // url:`${process.env.REACT_APP_OVERVIEW_API}${getUserId()}/overview`,
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_GET_ASSETS_API_PATH}`,
            headers: Headers
        }
        const response = await axios(request)
        console.log("Employee data", response.data);
        var devices = [];
        //data parser
        response.data.map((device) => {
            let data = {
                asset_id: device.asset_id,
                asset_name: device.asset_name,
                asset_type: device.asset_type,
                asset_username: device.asset_username
            }
            devices.push(data);
        })
        this.setState({
            data: devices,
            Loading: false,
            mainLoader: false
        });
    }

    formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    onSubmit = async (e) => {
        this.setState({ Loading: true });
        e.preventDefault()
        var deviceId = JSON.parse(e.target.deviceSelector.value);
        deviceId = deviceId.asset_id;
        var startDate = new Date(e.target.gte.value);
        var endDate = new Date(e.target.lte.value);
        
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999);

        var gte = startDate.getTime() / 1000;
        var lte = endDate.getTime() / 1000 ;
        
        if (e.target.gte.value === "" || e.target.lte.value === "") {

            var _startDate = new Date();
            var _endDate = new Date();
            _startDate.setHours(0,0,0,0);
            _endDate.setHours(23,59,59,999)

            gte = Math.round(_startDate.getTime() / 1000) - 86400;
            lte  = Math.round( _endDate.getTime() / 1000 ); 
        }
        
        var payload = {
            gte: gte,
            lte: lte,
            raw: true
        }
        let token = getToken();
        let Headers = {
            'authorization': "Bearer " + token
        }
        const request = {
            method: 'get',
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_GET_DATA_API_PATH}${deviceId}`,
            headers: Headers,
            params: payload
        }

        const response = await axios(request)
        console.log(response.data);

        /*
        Parser:->
        {
            data:{
                payload:[
                    {
                        added_on,
                        modified_on,
                        payload,
                        asset_id,
                        asset_name: "esp32",
                        asset_type: "wifi",
                        total_data: "13"
                    }
                ]
            }
        }
        */
        var dataList = [];
        try {
            if (response.data.data) {
                response.data.data.payload.map((data) => {
                    dataList.push(data);
                })
            }
            if (dataList.length > 0) {
                this.setState({ noDatafound: false });
                dataList.forEach(element => {
                    var today = new Date(element.added_on * 1000);
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //January is 0!

                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var formateToday = dd + '/' + mm + '/' + yyyy;
                    var date = formateToday + " " + this.formatAMPM(today);

                    let _data = element.payload;
                    delete element.payload;
                    element.show_marker = `${moment(element.added_on*1000).format("DD/MM/YYYY hh:mm A")}`
                    element.payload = {
                        d: _data
                    };
                    // console.log("[ELEMENT]", element);
                });

                // var bounds = []
                // if (this.state.data !== null) {
                //     this.state.data.map(device => (
                //         console.log(device)
                //         // bounds.push([device.payload.d.lat, device.payload.d.lon])
                //     ))
                // }
                // this.setState({bounds:bounds});
                this.setState({
                    markers: dataList,
                    showBound:true
                })
            }else {
                // console.error("EMPLOYEE DATA EMPTY");
                this.setState({
                    markers: [],
                    showBound:false
                })
            }
        } catch (error) {
            if (process.env.NODE_ENV != "production")
                console.log("[EMPLOYEE SUBMIT ERROR]", error);
            this.setState({ noDatafound: true });
        }
        this.setState({ Loading: false });
    }

    onDatePickerChanger(event) {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value })
    }

    handleCenterChange(event) {
        var center = JSON.parse(event.target.value);
        try {
            this.setState({ centerMarker: [center.data.payload.d.lat, center.data.payload.d.lon] });    
        } catch (error) {
            // console.error("[EMPLOYEE_ERROR_CENTER]",error);
        }
        
    }

    loaderScreen() {
        return (
            <div className={Styles["loader-wrapper"]}>
                <LoaderScreen type="spinner" />
            </div>
        );
    }

    renderRoutes() {
        var deviceList = [];
        deviceList = this.state.data ? this.state.data.map(device => (<option key={device.asset_id} value={JSON.stringify(device)} >{device.asset_name}</option>)) : null;
        // console.log("[EMPLOYEE deviceList]",this.state.data);
        // console.log("[EMPLOYEE MARKERS]",this.state.markers);
        if (this.state.mainLoader == false) {
            return (
                <div className={Styles["main-wrapper"]} >
                    <div className={Styles["header-wrapper"]}>
                            <Input className={Styles["deviceSelection"]} onChange={this.handleCenterChange.bind(this)} type="select" name="Device" id="deviceSelector">
                                {deviceList}
                            </Input>
                            <div className={Styles["datepicker"]}>
                                <Label for="gte">Start Date</Label>
                                <Input value={this.state.gte} type="date" name="gte" id="gte" onChange={this.onDatePickerChanger} placeholder="date placeholder" />
                            </div>
                            <div className={Styles["datepicker"]}>
                                <Label for="lte">End Date</Label>
                                <Input value={this.state.lte} type="date" name="lte" id="lte" onChange={this.onDatePickerChanger} placeholder="date placeholder" />
                            </div>
                            <Button type="submit" >Show Data</Button>
                        
                    </div>
                    <div className={Styles["content-wrapper"]}>
                        <GoogleMap centerMarker={this.state.centerMarker} bound={this.state.showBound} markersData={this.state.markers} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={Styles["loaderscreen-wrapper"]}>
                    <div className={Styles["loaderscreen"]}>
                        <LoaderScreen />
                    </div>
                </div>
            );
        }
    }



    render() {
        return (
            <React.Fragment>
                {this.state.Loading && this.loaderScreen()}
                {this.renderRoutes()}
            </React.Fragment>
        );
    }
}
export default Employees