import React from 'react'
import Loader from 'react-loader-spinner'
import {Spinner} from 'reactstrap'

 export default class LoaderScreen extends React.Component {
  //other logic
    render() {
      switch(this.props.type){
         case 'circles':
            return(
               <Loader
                  type="Puff"
                  color="#4A646D"
                  height={100}
                  width={100}
               />
            )
         case 'spinner':
            return(
               <Spinner type="grow" color="primary" />
            );
         default:
            return(
               <Loader
                  type="Puff"
                  color="#4A646D"
                  height={100}
                  width={100}
               />
            )
      }
    }
 }