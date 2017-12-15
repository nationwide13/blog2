interface Match {
    isExact: boolean;
    params: {
        [key: string]: string;
    };
    path: string;
    url: string;
}
export interface DefaultProps {
    match: Match;
}
export const defaultMatch = {
    isExact: false,
    params: {},
    path: '',
    url: ''
};
