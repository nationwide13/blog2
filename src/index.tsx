import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Amplify, { Auth } from 'aws-amplify';
import AuthStore, { CognitoUser } from './stores/auth';
import { DefaultProps, defaultMatch } from './constants/definitions';
import aws_exports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

Amplify.configure(aws_exports);

Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
    AuthStore.load(user);
    console.log('done');
    renderApp();
}).catch(() => renderApp());

function renderApp() {
    const defaultProps: DefaultProps = {match: defaultMatch};
    ReactDOM.render((
        <BrowserRouter>
            <App {...defaultProps}/>
        </BrowserRouter>
    ), document.getElementById('root'));
    registerServiceWorker();
}
