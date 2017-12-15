import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { DefaultProps } from '../constants/definitions';
import Home from './home';
import Layout from '../core/layout';

import logo from '../logo.svg';

export default class List extends React.Component<DefaultProps> {
    public componentWillMount() {
        document.title = 'List Page';
    }
    public render() {
        console.log(this.props.match);
        return (
            <div>
                {this.props.match.isExact &&
                <Layout className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Test list page</h2>
                    </div>
                    <p className="App-intro">
                        Major work in progress, just barely got started so take a chill pill
                    </p>
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                </Layout>
                }
                <Route path="/list/:topic" component={Home}/>
            </div>
        );
    }
}
