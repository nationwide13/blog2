import ajax from './ajax';

export default class Imgur {
    public static getAlbum(album: string, cb: (data: ImgurAlbum) => void) {
        const clientId = '2c9934602f31f00';
        const url = 'https://api.imgur.com/3/album/' + album + '/images';
        ajax(url, cb, {Authorization: 'Client-ID ' + clientId});
    }
}

export interface ImgurAlbum {
    data: ImgurImage[];
}
export interface ImgurImage {
    account_id?: string;
    account_url?: string;
    animated: boolean;
    datetime: number;
    description?: string;
    has_sound: boolean;
    height: number;
    id: string;
    link: string;
    nsfw?: boolean;
    size: number;
    tags: string[];
    title?: string;
    type: string;
    views: number;
    vote: number;
    width: number;
}
