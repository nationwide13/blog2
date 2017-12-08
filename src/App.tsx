import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './panels/home';
import List from './panels/list';
import './App.css';

class App extends React.Component {
    public render() {
        return (
            <main>
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/list" component={List}/>
                </Switch>
            </main>
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
