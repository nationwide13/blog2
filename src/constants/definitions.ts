interface Match {
    isExact: boolean;
    params: {
        [key: string]: string;
    };
    path: string;
    url: string;
}
interface Location {
    hash: string;
    pathname: string;
    search: string;
    state: string | undefined;
}
export interface DefaultProps {
    match: Match;
    location: Location;
}
export const defaultMatch = {
    isExact: false,
    params: {},
    path: '',
    url: ''
};
export const defaultLocation = {
    hash: '',
    pathname: '',
    search: '',
    state: undefined
};
export const EmptyProps: DefaultProps = {
    location: defaultLocation,
    match: defaultMatch
};
