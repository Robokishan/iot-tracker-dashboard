import React from 'react'
import {Button } from 'reactstrap'
import {getToken} from '../../utils/storage'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        let token = getToken();
        if(token !== null && token !== '') {
            this.props.history.push('/dashboard')
        }
        else{
            this.props.history.push('/login')
        }
    }

    login() {
        this.props.history.push("/login");
    }
    render() {
        return (
            <div >
                <div className="parentlogin">
                    <div className="loginbox">
                        <Button onClick={this.login}>Login</Button>
                    </div>
                </div>
            </div>
        )
    }
};
export default Home