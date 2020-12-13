import React, { Component } from 'react';
import Styles from './NotFound.module.css';


class NotFound extends Component {
    render() {
       
          return (
            <section className={Styles["page_404"]}>
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 ">
                    <div className="col-sm-10 col-sm-offset-1  text-center">
                      <div className={Styles["four_zero_four_bg"]}>
                        <h1 className="text-center">404</h1>
                      </div>
                      <div className={Styles["contant_box_404"]}>
                        <h3 className="h2">
                          Look like you're lost
                        </h3>
                        <p>the page you are looking for not avaible!</p>
                        <a href="/" className={Styles["link_404"]}>Go to Home</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        };
}
export default NotFound;