import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { DefaultProps } from '../constants/definitions';
import Home from './home';
import Layout from '../core/layout';
import AppSyncStore from '../stores/appsync';
import { Post } from '../constants/schema';
import Album from '../components/imgur/album';

import logo from '../logo.svg';

export default class List extends React.Component<DefaultProps> {
    public componentWillMount() {
        document.title = 'List Page';
    }
    public render() {
        AppSyncStore.getAllPostsQuery((data: Post[]) => console.log(data), 1);
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
                        <Album album="0ZXgI"/>
                    </Layout>
                }
                <Route path="/list/:topic" component={Home}/>
            </div>
        );
    }
}
