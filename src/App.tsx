import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
// var WindowDimensions = React.createClass({
//     render: function() {
//         return <span>{this.state.width} x {this.state.height}</span>;
//     },
//     updateDimensions: function() {
//         this.setState({width: $(window).width(), height: $(window).height()});
//     },
//     componentWillMount: function() {
//         this.updateDimensions();
//     },
//     componentDidMount: function() {
//         window.addEventListener("resize", this.updateDimensions);
//     },
//     componentWillUnmount: function() {
//         window.removeEventListener("resize", this.updateDimensions);
//     }
// });
