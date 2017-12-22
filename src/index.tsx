import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AWSAppSyncClient from 'aws-appsync';
import Amplify, { Auth } from 'aws-amplify';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { Rehydrated } from 'aws-appsync-react';

import App from './App';
import awsconfig from './appsync';
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

const client = new AWSAppSyncClient({
    auth: {type: awsconfig.authenticationType, apiKey: awsconfig.apiKey},
    region: awsconfig.region,
    url: awsconfig.graphqlEndpoint
});

function renderApp() {
    ReactDOM.render((
        <ApolloProvider client={client}>
            <Rehydrated>
                <BrowserRouter>
                    <App {...EmptyProps}/>
                </BrowserRouter>
            </Rehydrated>
        </ApolloProvider>
    ), document.getElementById('root'));
    registerServiceWorker();
}
