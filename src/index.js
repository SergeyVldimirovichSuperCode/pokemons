import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppHeader from "./componets/app-header";
import App from "./App";

export default class Index extends Component{
    render(){
      return(
        <div className="main">
          <AppHeader/>
          <App />
        </div>
      )
    }
}
ReactDOM.render(<Index/>, document.getElementById('root'));