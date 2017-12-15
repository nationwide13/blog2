import * as React from 'react';
import { Link } from 'react-router-dom';
import { DefaultProps } from '../constants/definitions';
import Layout from '../core/layout';
import logo from '../logo.svg';

export default class Home extends React.Component<DefaultProps> {
    public componentWillMount() {
        document.title = 'Home Page';
    }
    public render() {
        return (
            <Layout>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Twisty's Blog 2.0</h2>
                </div>
                <p className="App-intro">Major work in progress, just barely got started so take a chill pill</p>
                <p>This is a test for auto build</p>
                <div>
                    <Link to="/list">List</Link>
                </div>
            </Layout>
        );
    }
}
