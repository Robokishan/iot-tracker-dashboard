import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from './Sidebar.module.css'

class Sidebar extends React.Component{
  
    render(){
        return(
            <React.Fragment>
            <div className={Styles.sidebar}>
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
      
            </div>
            </React.Fragment>
        );
    }
}
export default Sidebar;