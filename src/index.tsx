import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Amplify, { Auth } from 'aws-amplify';
import AuthStore, { CognitoUser } from './stores/auth';
import { EmptyProps } from './constants/definitions';
import aws_exports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'font-awesome/css/font-awesome.css';

Amplify.configure(aws_exports);

Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
    AuthStore.load(user);
    renderApp();
}).catch(() => renderApp());

function renderApp() {
    ReactDOM.render((
        <BrowserRouter>
            <App {...EmptyProps}/>
        </BrowserRouter>
    ), document.getElementById('root'));
    registerServiceWorker();
}
