import * as React from 'react';
import AuthStore from '../stores/auth';

export default class AdminHeader extends React.Component {
    public render() {
        return (
            <div>
                {AuthStore.isSignedIn() && <span>Hello {AuthStore.getUsername()}. <a onClick={AuthStore.signOut} className="sign-out">Sign Out</a></span>}
            </div>
        );
    }
}
