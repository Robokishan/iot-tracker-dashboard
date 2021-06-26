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
    this.state = {
      "sidebar":false
    }
    this.logout = this.logout.bind(this);
    this.sidebarToggle = this.sidebarToggle.bind(this);
}
    logout(){
        eraseAllvalues();
        this.props.history.push('/');
    }

    sidebarToggle() {
      let sidebar = this.state.sidebar;
      this.setState({"sidebar":!sidebar});
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
        let sidebarWrapper = this.state.sidebar === true ? Styles["sidebar-open"] : Styles["sidebar-close"];
        return (
          <React.Fragment>
          <div className={Styles["body-wrapper"]}>
            <div className={`${Styles['sidebar-wrapper']} ${sidebarWrapper}`}>
              <Sidebar routes={routes} />
            </div>
            <div className={Styles["header"]}>
              <div className={Styles["user-side"]}>
                <Label className={Styles["icon-label"]}>Xoxo</Label>
                <Button color="danger" className={Styles["logout-button"]} onClick={this.logout}>Logout</Button>
                <div className={Styles["menu-button"]} onClick={this.sidebarToggle} aria-label="Left Align">
                  <span className={Styles["bar"]}></span>
                  <span className={Styles["bar"]}></span>
                  <span className={Styles["bar"]}></span>
                </div>
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