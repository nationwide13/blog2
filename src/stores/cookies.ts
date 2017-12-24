import * as Reflux from 'reflux';
import Cookies from 'universal-cookie';

interface CookieStoreDefinition extends Reflux.Store {
    getCookies(): Cookies;
}
interface Cookies {
    getAll(): string;
    set(name: string, value: string): void;
    get<Type>(name: string): Type;
    remove(name: string): void;
}
const CookieStore = Reflux.createStore({
    init() {
        this.cookies = new Cookies();
    },
    getCookies() {
        return this.cookies;
    }
}) as CookieStoreDefinition;

export default CookieStore;
