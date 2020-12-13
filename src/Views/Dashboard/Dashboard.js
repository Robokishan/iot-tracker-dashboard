import React from 'react'
import {eraseAllvalues} from '../../utils/storage'
import routes from "../../routes.js";
import Styles from './Dashboard.module.css'
import { Route, Switch,Redirect} from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Button, Label } from 'reactstrap';
const mql = window.matchMedia(`(min-width: 800px)`);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
}
    logout(){
        eraseAllvalues();
        this.props.history.push('/');
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/dashboard") {
            return (
              <Route
              exact
                path={prop.layout + prop.path}
                render={props => (
                  <prop.component
                    {...props}
                  />
                )}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
    };

    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
    }


    render() {          
        return (
          <React.Fragment>
          <div className={Styles["body-wrapper"]}>
            <div className={Styles["sidebar-wrapper"]}>
              <Sidebar routes={routes} />
            </div>
            <div className={Styles["header"]}>
              <div className={Styles["user-side"]}>
                <Label>Xoxo</Label>
                <Button className={Styles["logout-button"]} onClick={this.logout}>Logout</Button>
              </div>
            </div>
            <div className={Styles["content-wrapper"]} >
            <Switch>
              {this.getRoutes(routes)}
              <Route path="*"><Redirect to="/404" /></Route> 
            </Switch>
            </div>
            </div>
          </React.Fragment>
        );
      }
}

export default Dashboard