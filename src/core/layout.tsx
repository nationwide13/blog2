import * as React from 'react';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
    disableHeader?: boolean;
    disableFooter?: boolean;
}
export default class Layout extends React.Component<LayoutProps> {
    public static defaultProps: Partial<LayoutProps> = {
        disableFooter: false,
        disableHeader: false
    };
    public render() {
        return(
            <div className="App">
                {!this.props.disableHeader && <Header/>}
                {this.props.children}
                {!this.props.disableFooter && <Footer/>}
            </div>
        );
    }
}
