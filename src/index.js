import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppHeader from "./componets/app-header";
import App from "./App";
import  { SWRConfig } from 'swr'

export default class Index extends Component {
  render() {
    return (
      <div className="main">
        <AppHeader />
        <SWRConfig
          value={{
            fetcher: (...args) => fetch(...args).then((res) => res.json())
          }}>
          <App />
        </SWRConfig>
      </div>
    )
  }
}
ReactDOM.render(<Index />, document.getElementById('root'));