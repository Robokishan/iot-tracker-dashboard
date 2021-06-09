import React from 'react';
import {Image, Row, Col, FormGroup} from 'react-bootstrap'
import {Input,Form,Label, Button} from 'reactstrap'
import Styles from './Profile.module.css'
import default_avatar from "../../default_avatar.png"
import {getUser} from '../../utils/storage'

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      avatar: default_avatar,
      email: 'email@example.com',
      name: 'example name',
    };
  }

  onImageOverlayclick(event){

  }

  onDataChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  onSubmit = async (e) =>{
    e.preventDefault();
  }

  componentWillReceiveProps(props) {
    
  }

  componentDidMount(){
    
    var user = getUser();
    this.setState({
      avatar:"https://www.pngkey.com/png/full/230-2301779_best-classified-apps-default-user-profile.png",
    })
    
    try {
      if(user.avatar) this.setState({avatar:user.avatar});
      if(user.email) this.setState({email:user.email});
      if(user.name) this.setState({name: user.name});  
    } catch (error) {
      console.log(error);
    }
    
  }

  render(){
    const avatarOverlay= <div className={Styles.middle}>
                          <div className={Styles.text}>Change Photo</div>
                         </div>;
    return(
      <div className={Styles.profileContainer}>
          <Form className={Styles.profile}>
          <div className={Styles.imageContainer}>
          <Row>
              <Col xs={6} md={4}>
                {avatarOverlay}
                  <Image 
                    className={Styles.avatarStyle} 
                    src={this.state.avatar}
                    roundedCircle/>
              </Col>
          </Row>
          </div>
          <FormGroup>
            <Label> Email </Label>
            <Input invalid={this.state.error} className={Styles["email"]} type="email" placeholder="Email" value={this.state.email} onChange={this.onDataChange.bind(this)} />
          </FormGroup>
          <FormGroup>
            <Label> Name </Label>
            <Input invalid={this.state.error} className={Styles["email"]} type="text" placeholder="Name" value={this.state.name} onChange={this.onDataChange.bind(this)} />
          </FormGroup>
          <div className={Styles.saveButton}>
            <Button  type="submit" className="btn-lg btn-dark btn-block" onClick={this.onSubmit} >Save</Button>
          </div>
          </Form>
      </div>
    );
  }
}
export default Profile;