import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AdminHeader from './admin-header';

interface HeaderState {
    userLoading: boolean;
}
export default class Header extends React.Component<{}, HeaderState> {
    public render() {
        return(
            <div className="header">
                <AdminHeader/>
                <div className="left">
                    <NavLink to="/" activeStyle={{color: 'red'}} exact={true}>Featured</NavLink>
                    <NavLink to="/btc" activeStyle={{color: 'red'}} exact={true}>BTC</NavLink>
                </div>
                <div className="right">
                    Search Maybe?
                </div>
            </div>
        );
    }
}
