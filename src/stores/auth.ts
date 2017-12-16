import * as Reflux from 'reflux';
import { Auth } from 'aws-amplify';
// const authStates = [
//     'singIn',
//     'signUp',
//     'configmSignUp',
//     'singedUp',
//     'signedIn'
// ];
interface AuthStoreDefinition extends Reflux.Store {
    refreshState: (authState: string) => void;
    getUsername: () => string;
    isSignedIn: () => boolean;
    isAdmin: () => boolean;
    load: (user: CognitoUser) => void;
    signOut: () => boolean;
    signIn: (username: string, password: string) => string;
}
export interface CognitoUser {
    username: string;
    signInUserSession: {
        idToken: {
            payload: {
                'cognito:groups': string[];
            }
        }
    };
}
const AuthStore = Reflux.createStore({
    init() {
        this.user = '';
        this.groups = [];
        this.authState = 'singIn';
    },

    load(user: CognitoUser) {
        this.user = user.username;
        this.groups = user.signInUserSession.idToken.payload['cognito:groups'];
        this.authState = 'signedIn';
    },

    triggerState() {
        this.trigger({
            authState: this.authState
        });
    },

    refreshState(authState: string) {
        this.authState = authState;
        if (this.authState === 'signedIn') {
            Auth.currentAuthenticatedUser().then((user: CognitoUser) => {
                this.load(user);
                this.triggerState();
            }).catch(() => null);
        } else {
            this.triggerState();
        }
    },

    getUsername() {
        return this.user;
    },

    isSignedIn() {
        return this.authState === 'signedIn';
    },

    isAdmin() {
        return this.groups.indexOf('admins') > -1;
    },

    signOut() {
        if (this.isSignedIn()) {
            Auth.signOut().then(() => true);
        }
        return false;
    },

    signIn(username: string, password: string) {
        if (!this.isSignedIn()) {
            Auth.signIn(username, password).catch((e: Error) => {
                return 'failed';
            });
        }
    }
}) as AuthStoreDefinition;

export default AuthStore;
