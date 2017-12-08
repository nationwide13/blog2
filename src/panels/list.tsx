import * as React from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';

export default class List extends React.Component {
    public componentWillMount() {
        document.title = 'List Page';
    }
    public render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Test list page</h2>
                </div>
                <p className="App-intro">
                    Major work in progress, just barely got started so take a chill pill
                </p>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>
        );
    }
}
