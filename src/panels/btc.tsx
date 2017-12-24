import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import ajax from '../utilities/ajax';
import CookieStore from '../stores/cookies';
import Modal from '../components/modal';

const cookies = CookieStore.getCookies();
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
        const saved = cookies.get<BTCState>('btc');

        const value: {[key: string]: number; } = {};
        const display: {[key: string]: boolean; } = {};
        for (const coin of coinArray) {
            value[coin] = 0;
            display[coin] = saved ? (saved.display[coin] !== false) : true;
        }

        display.graph = saved ? !!(saved.display.graph) : true;

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
                        return <div style={{fontSize: '24px', lineHeight: '30px'}} key={coin}>{coin}: {this.state.value[coin]}</div>;
                    }
                    return null;
                })}
                <div onClick={() => this.setState({modal: true})} style={{fontSize: '24px', lineHeight: '30px', textDecoration: 'underline'}}>Edit Coins</div>
                {this.state.display.graph && <iframe style={{width: '100vw', height: `calc(100vh - ${coinCount}px`, border: 'none'}} src="https://dwq4do82y8xi7.cloudfront.net/widgetembed/?symbol=KRAKEN%3AXBTUSD&interval=D&symboledit=1&toolbarbg=f1f3f6&hideideas=1&studies=&theme=White&style=1&timezone=exchange"/>}
                {this.state.modal && <Modal title="Change Coins" onDismiss={() => this.setState({modal: false})}>
                    <div>
                        {coinArray.map((coin) => {
                            return (
                                <div style={{fontSize: '20px', lineHeight: '30px'}} key={coin}>
                                    <FontAwesome onClick={this.changeDisplay.bind(this, coin)} name={this.state.display[coin] ? 'check-square' : 'square-o'}/> {coin}
                                </div>
                            );
                        })}
                        <div style={{fontSize: '20px', lineHeight: '30px'}}>
                            <FontAwesome onClick={this.changeDisplay.bind(this, 'graph')} name={this.state.display.graph ? 'check-square' : 'square-o'}/> Display Graph
                        </div>
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
        this.updateState('value', value);
        setTimeout(() => ajax('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', this.updatePrices.bind(this)), 10000);
    }
    public changeDisplay(coin: string) {
        const display = this.state.display;
        display[coin] = !display[coin];
        this.updateState('display', display);
    }
    private updateState(name: string, data: Object) {
        const state = this.state;
        state[name] = data;
        this.setState(state);
        name = 'modal';
        state[name] = false;
        cookies.set('btc', JSON.stringify(state));
    }
}
