import * as React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import * as querystring from 'query-string';
import Home from './panels/home';
import List from './panels/list';
import Admin from './panels/admin';
import BTC from './panels/btc';
import { DefaultProps } from './constants/definitions';
import AuthStore from './stores/auth';
import { Authenticator } from 'aws-amplify-react';
import './App.css';

class App extends React.Component<DefaultProps, {authState: string, authListener: Function}> {
    public constructor(props: DefaultProps) {
        super(props);
        this.state = {
            authListener: AuthStore.listen(this.AuthStoreListener, AuthStore),
            authState: 'signIn'
        };
    }
    public render() {
        const qs = querystring.parse(this.props.location.search);
        const showAdmin = Object.prototype.hasOwnProperty.call(qs, 'admin');
        return (
            <main>
                <Authenticator onStateChange={this.handleAuthStateChange} />
                <Switch>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/list" component={List}/>
                    <Route path="/btc" component={BTC}/>
                    <PrivateRoute path="/private" component={List}/>
                </Switch>
                {showAdmin && !AuthStore.isSignedIn() && <Route component={Admin}/>}
            </main>
        );
    }

    public handleAuthStateChange = (state: string) => {
        AuthStore.refreshState(state);
    }
    public AuthStoreListener = (data: {authState: string}) => {
        this.setState({
            authState: data.authState
        });
    }
}
/*tslint:disable:no-any*/
const PrivateRoute = ({component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={(props) =>
            (AuthStore.isSignedIn() ? <Component {...props} /> : <Redirect to="/" />)
        }
    />
);
/*tslint:enable*/
export default withRouter(App);
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
