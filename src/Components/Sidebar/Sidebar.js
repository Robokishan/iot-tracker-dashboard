import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Sidebar.module.css'

class Sidebar extends React.Component{
  constructor(props) {
    super(props);
  }
    render(){
        // let classSidebar = this.props.open === true ? Styles["sidebar-open"] : Styles["sidebar-close"];
        let classSidebar = Styles["sidebar-open"];
        return(
            <React.Fragment>
            <div className={`${Styles.sidebar} ${classSidebar}`}>
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                    <NavLink
                      key={prop.path}
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName={Styles.active}>
                      <i className={prop.icon} />
                      {prop.name}
                    </NavLink>
                );
              return null;
            })}
            <div className={Styles.details}>
            <span  >Version 1.0.3</span>
            </div>
            </div>
            </React.Fragment>
        );
    }
}
export default Sidebar;