import * as React from 'react';
import Imgur, { ImgurAlbum } from '../../utilities/imjur';
import Popup from './popup';

import './imgur.css';

interface AlbumProps {
    album: string;
}
interface AlbumState {
    contents: JSX.Element;
    images: string[];
    popup: JSX.Element | null;
}
export default class Album extends React.Component<AlbumProps, AlbumState> {
    public constructor(props: AlbumProps) {
        super(props);
        Imgur.getAlbum(this.props.album, this.handleLoad);
        this.state = {
            contents: <div>Album Here</div>,
            images: [],
            popup: null
        };
    }
    public render() {
        return (
            <div className="album">
                <div className="contents">{this.state.contents}</div>
                <div className="popup">{this.state.popup}</div>
            </div>
        );
    }
    public handleLoad = (album: ImgurAlbum) => {
        const albumImages: JSX.Element[] = [];
        const images: string[] = [];
        let index = 0;
        for (const image of album.data) {
            images.push(image.link);
            albumImages.push(<img key={index} onClick={this.handleImageClick.bind(this, index)} src={image.link} style={{width: '200px'}}/>);
            index++;
        }
        const contents = (
            <div>
                <div className="thumbnails">{albumImages.map((image) => image)}</div>
            </div>
        );
        this.setState({contents, images});
    }
    public handleImageClick(index: number) {
        this.setState({
            popup: <Popup current={index} images={this.state.images} onClose={this.closePopup}/>
        });
    }
    public closePopup = () => {
        this.setState({
            popup: null
        });
    }
}
