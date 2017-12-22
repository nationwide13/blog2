import * as React from 'react';
import ajax from '../utilities/ajax';

interface BTCState {
    btc: number;
    eth: number;
}
export default class BTC extends React.Component<{}, BTCState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            btc: 0,
            eth: 0
        };
    }
    public render() {
        return (
            <div>
                <div>BTC: {this.state.btc}</div>
                <div>ETH: {this.state.eth}</div>
            </div>
        );
    }
    public componentWillMount() {
        ajax('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', this.updatePrices.bind(this));
    }
    public updatePrices(data: {[key: string]: {USD: number}}) {
        this.setState({
            btc: data.BTC.USD,
            eth: data.ETH.USD
        });
        setTimeout(() => ajax('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', this.updatePrices.bind(this)), 5000);
    }
}
