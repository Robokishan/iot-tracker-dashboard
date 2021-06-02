import React from 'react'
import Styles from './Preferences.module.css'
import { Button, Form } from 'react-bootstrap';
import { getToken,getUserId } from '../../utils/storage'
import axios from 'axios';
import LoaderScreen from '../Loader/Loader';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup,Label } from 'reactstrap';
import { Table } from 'react-bootstrap';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assetList: [],
            Loading: true,
            currentDeviceIndex: 0,
            addDeviceUsername:"",
            editAssetModal: false,
            addAssetModal:false
        }
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleAdddevice = this.toggleAdddevice.bind(this);
        this.addDevice = this.addDevice.bind(this);
        this.sendRequestAdd = this.sendRequestAdd.bind(this);
        this.fetchDevices = this.fetchDevices.bind(this);
    }

    removeDevice = async(asset_id)=>{
        let Headers = {
            'authorization': `Bearer ${getToken()}`
        }
        const request = {
            method: 'delete',
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_DELETE_ASSET_API_PATH}`,
            headers:Headers,
            params:{
                "asset_id":asset_id
            }
        }
        console.log("request",request)
        try {
            console.log("ID Removed", asset_id);
            const response = await axios(request);
        } catch (error) {
            console.error("Delete error", error);
        }
        this.fetchDevices();
    }

    fetchDevices = async() => {
        this.setState({ Loading: true })
        let token = getToken();
        let Headers = {
            'authorization': "Bearer " + token
        }
        const request = {
            method:'get',
            // url:`${process.env.REACT_APP_OVERVIEW_API}${getUserId()}/overview`,
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_GET_ASSETS_API_PATH}`,
            headers:Headers
        }
        try {
            // const response = {
            //     data: []
            // };
            // response.data =
            //     [{ "id": 2810, "deviceId": "HV01T0001", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0001", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0001", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1577632501, "lon": 72.541175, "lat": 23.064377 } } } }, { "id": 2811, "deviceId": "HV01T0002", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0002", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0002", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1577630701, "lon": 72.541124, "lat": 23.064259 } } } }, { "id": 2812, "deviceId": "HV01T0003", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0003", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0003", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1577633401, "lon": 72.518545, "lat": 23.05159 } } } }, { "id": 2813, "deviceId": "HV01T0004", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0004", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0004", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1572414301, "lon": 72.517172, "lat": 23.016658 } } } }, { "id": 2814, "deviceId": "HV01T0005", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0005", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0005", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1577632501, "lon": 72.5254, "lat": 23.032028 } } } }, { "id": 2815, "deviceId": "HV01T0006", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0006", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0006", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1573115401, "lon": 72.51204, "lat": 23.012778 } } } }, { "id": 2816, "deviceId": "HV01T0007", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0007", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0007", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1577631601, "lon": 72.527303, "lat": 23.066905 } } } }, { "id": 2817, "deviceId": "HV01T0008", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0008", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0008", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1574255701, "lon": 72.541189, "lat": 23.064463 } } } }, { "id": 2818, "deviceId": "HV01T0009", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0009", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0009", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1569723301, "lon": 73.026177, "lat": 22.236996 } } } }, { "id": 2819, "deviceId": "HV01T0010", "userId": 2083, "deviceType": "POLLUDRON_PRO", "latitude": 23.012603, "longitude": 72.511919, "loc": "Ahmedabad", "label": "HV01T0010", "city": "Ahmedabad", "country": "India", "isOnline": 1, "config": { "interval": null }, "data": { "deviceId": "HV01T0010", "deviceType": "POLLUDRON_PRO", "payload": { "d": { "t": 1570770001, "lon": 72.506394, "lat": 23.011609 } } } }];
            const response = await axios(request);
            var deviceList = [];
            response.data.map((device) => {
                let data = {
                    asset_id: device.asset_id,
                    asset_name: device.asset_name,
                    asset_type: device.asset_type,
                    asset_username: device.asset_username,
                    added_on: device.added_on,
                    avatar: device.avatar
                }
                deviceList.push(data);
            })
            console.log("[Preference data]", deviceList);
            this.setState({
                assetList: deviceList
            });
        } catch (error) {
            this.setState({
                assetList: []
            });
            console.log(error);
        }
        this.setState({ Loading: false })
    }

    async componentDidMount() {
        // this.setState({ Loading: true })
        await this.fetchDevices();
        // this.setState({ Loading: false });
    }
    editAsset = async(e, asset_id) => {
        e.preventDefault()
        let asset_name = e.target.asset_name.value;
        let asset_type = e.target.asset_type.value;
        console.log("asset_id",asset_id);
        let Headers = {
            'authorization': `Bearer ${getToken()}`
        }
        const request = {
            method: 'put',
            url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_PUT_ASSET_UPDATE_API_PATH}${asset_id}`,
            headers:Headers,
            data: {
                "asset_name":asset_name,
                "assetType":asset_type
            }
        }
        console.log("request",request)
        try {
            console.log(asset_name, asset_type);
            const response = await axios(request);
        } catch (error) {
            console.error("put error", error);
        }
        this.fetchDevices();
    }
    sendRequestAdd = async(e) => {
        e.preventDefault();
        console.log(e);

        if(!this.state.addDeviceUsername){
            this.toggleAdddevice();
        }
        else if(this.state.addDeviceUsername.length > 1)
        {
            var assetUsername = this.state.addDeviceUsername.toLowerCase();
            let token = getToken();
            let Headers = {
                'authorization': "Bearer " + token
            }
            const payload = {
                "asset_username":assetUsername
            }
            const request = {
                method:'post',
                url: `${process.env.REACT_APP_XOXO_URL}${process.env.REACT_APP_XOXO_ADDDEVICE_API_PATH}`,
                headers:Headers,
                data: payload
            }
            try {
                const response = await axios(request);
                this.toggleAdddevice();
            }
            catch(error){
                
            }
            await this.fetchDevices();
        }
        // console.log
        // this.toggleAdddevice();
    }
    loaderscreen() {
        return (
            <div className={Styles["loader-wrapper"]}>
                <LoaderScreen type="spinner" />
            </div>
        );
    }

    openDevice(index, assetid) {
        if (assetid === this.state.assetList[index].asset_id) {
            this.setState({
                editAssetModal: true,
                currentDeviceIndex: index
            })
        }
    }
    addDevice() {
        this.setState({
            addAssetModal: true
        })
    }

    toggleEditModal() {
        this.setState({
            editAssetModal: !this.state.editAssetModal
        })
    }
    toggleAdddevice(){
        this.setState({
            addAssetModal: !this.state.addAssetModal
        })
    }
    handleaddDeviceUsername(event) { this.setState({ addDeviceUsername: event.target.value }); }

    epochTodt(epoch) {
        var today = new Date(epoch * 1000);
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
        return date;
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

    render() {
        const modal = this.state.assetList.length > 0 ?
            <div>
                <Modal isOpen={this.state.editAssetModal} toggle={this.toggleEditModal}>
                <ModalHeader toggle={this.toggleEditModal}>Edit: {this.state.assetList[this.state.currentDeviceIndex].asset_username}</ModalHeader>
                <Form onSubmit={(e) => { 
                    this.editAsset(e, this.state.assetList[this.state.currentDeviceIndex].asset_id)
                    this.toggleEditModal();
                    }}>
                    <ModalBody>
                        <div className={Styles.editTexts}>
                            <Label style={{"display":"none"}} name="asset_id" id="asset_id" value={this.state.assetList[this.state.currentDeviceIndex].asset_id}></Label>
                        <FormGroup>
                            <Label>Device Name</Label>
                            <Input name="asset_name" id="asset_name" defaultValue={this.state.assetList[this.state.currentDeviceIndex].asset_name} className={Styles["email"]} type="text" placeholder="Device"/>
                        </FormGroup>
                        <FormGroup >
                            <Label>Device Type</Label>
                            <Input name="asset_type" id="asset_type" defaultValue={this.state.assetList[this.state.currentDeviceIndex].asset_type}  invalid={this.state.error} className={Styles["email"]} type="text" placeholder="Name"/>
                        </FormGroup>
                        </div>
                        <Button variant="danger" type="submit">Save</Button>{' '}
                        <Button variant="primary" onClick={this.toggleEditModal}>Cancel</Button>
                    </ModalBody>
                    </Form>
                </Modal>
            </div> : null;
        const addDeviceModal = this.state.addAssetModal == true  ? 
        <div>
            <Modal isOpen={this.state.addAssetModal} toggle={this.toggleAdddevice}>
                <ModalHeader toggle={this.toggleAdddevice}>Edit</ModalHeader>
                <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label>Device</Label>
                        <Input values="" className={Styles["email"]} onChange={this.handleaddDeviceUsername.bind(this)} type="text" placeholder="Username"/>
                    </FormGroup>
                    
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={this.sendRequestAdd}>Save</Button>{' '}
                    <Button variant="primary" onClick={this.toggleAdddevice}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div> : null;
    
        var assets = this.state.assetList.length > 0 ? this.state.assetList.map((asset, index) => (
            <tr>
                <td align="center" className={Styles.buttonContainer} >
                    <div className={Styles.internalContainer} >
                    <Button
                        variant="primary"
                        className={Styles.editbutton}
                        onClick={this.openDevice.bind(this, index, asset.asset_id)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        className={Styles.removeButton}
                        onClick={this.removeDevice.bind(this, asset.asset_id)}>
                        Remove
                    </Button>
                    
                    </div>  
                </td>
                <td>{asset.asset_username}</td>
                <td>{asset.asset_name}</td>
                <td>{asset.asset_type}</td>
                <td>{this.epochTodt(asset.added_on)}</td>
            </tr>
        )) : <td colSpan="4" align="center" >No Assets added</td>
        return (
            <React.Fragment>
                <div className={Styles.prefcontainer}>
                    <div>
                <Button variant="success" className={Styles["add-button"]} onClick={this.toggleAdddevice}> ➕Add device</Button>
                </div>
                {this.state.Loading && this.loaderscreen()}
                <div className={Styles.tablecontainer}>
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th class="time" >Action</th>
                            <th class="sticky-header">Username</th>
                            <th class="sticky-header">Name</th>
                            <th class="sticky-header">Type</th>
                            <th class="sticky-header">Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        {assets}
                        
                    </tbody>
                </Table>
                </div>
                <div className={Styles.paginationContainer} >
                    <div className={Styles.content}>
                    <Button >Prev</Button>
                    <span>Number</span>
                    <Button>Next</Button> 
                    </div>
                </div>
                {addDeviceModal}
                {modal}

                </div>
                
            </React.Fragment>
        );
    }
}


export default Setting;