import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import ajax from '../utilities/ajax';
import Modal from '../components/modal';

const coinArray = ['BTC', 'ETH', 'LTC', 'BCH', 'XRP'];
interface BTCState {
    value: {
        [key: string]: number;
    };
    display: {
        [key: string]: boolean;
    };
    modal: boolean;
}
export default class BTC extends React.Component<{}, BTCState> {
    public constructor(props: {}) {
        super(props);
        const value: {[key: string]: number; } = {};
        const display: {[key: string]: boolean; } = {};
        for (const coin of coinArray) {
            value[coin] = 0;
            display[coin] = true;
        }
        display.BTC = true;
        this.state = {
            display,
            modal: false,
            value
        };
    }
    public render() {
        let coinCount = 30;
        return (
            <div>
                {coinArray.map((coin) => {
                    if (this.state.display[coin]) {
                        coinCount = coinCount + 30;
                        return <div style={{'font-size': '24px', 'line-height': '30px'}} key={coin}>{coin}: {this.state.value[coin]}</div>;
                    }
                    return null;
                })}
                <div onClick={() => this.setState({modal: true})} style={{'font-size': '24px', 'line-height': '30px', 'text-decoration': 'underline'}}>Edit Coins</div>
                <iframe style={{width: '100vw', height: `calc(100vh - ${coinCount}px`, border: 'none'}} src="https://dwq4do82y8xi7.cloudfront.net/widgetembed/?symbol=KRAKEN%3AXBTUSD&interval=D&symboledit=1&toolbarbg=f1f3f6&hideideas=1&studies=&theme=White&style=1&timezone=exchange"/>
                {this.state.modal && <Modal title="Change Coins" onDismiss={() => this.setState({modal: false})}>
                    <div>
                        {coinArray.map((coin) => {
                            return (
                                <div style={{'font-size': '20px', 'line-height': '30px'}} key={coin}>
                                    <FontAwesome onClick={this.changeDisplay.bind(this, coin)} name={this.state.display[coin] ? 'check-square' : 'square-o'}/> {coin}
                                </div>
                            );
                        })}
                    </div>
                </Modal>}
            </div>
        );
    }
    public componentWillMount() {
        ajax('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,BCH,XRP&tsyms=USD', this.updatePrices.bind(this));
    }
    public updatePrices(data: {[key: string]: {USD: number}}) {
        const value = this.state.value;
        for (const coin in data) {
            if (value.hasOwnProperty(coin)) {
                value[coin] = data[coin].USD;
            }
        }
        this.setState({
            value
        });
        setTimeout(() => ajax('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', this.updatePrices.bind(this)), 10000);
    }
    public changeDisplay(coin: string) {
        const display = this.state.display;
        display[coin] = !display[coin];
        this.setState({
            display
        });
    }
}
