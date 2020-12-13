/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Overview from './Views/Overview/Overview'
import Preferences from './Views/Preferences/Preferences'
import Employees from './Views/Employees/Employees'
// import Blank from './Views/Blank/Blank'
import Profile from './Views/Profile/Profile';

const dashboardRoutes = [
  {
    path: "/overview",
    name: "Overview",
    icon: "pe-7s-graph",
    component: Overview,
    layout: "/dashboard"
  },
  {
    path: "/Employees",
    name: "Employees",
    icon: "pe-7s-graph",
    component: Employees,
    layout: "/dashboard"
  },
  {
    path: "/profiles",
    name: "Profiles",
    icon: "pe-7s-graph",
    component: Profile,
    layout: "/dashboard"
  },
  {
    path: "/Preferences",
    name: "Preferences",
    icon: "pe-7s-graph",
    component: Preferences,
    layout: "/dashboard"
  }
];

export default dashboardRoutes;
