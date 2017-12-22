import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';

interface PopupProps {
    images: string[];
    current: number;
    onClose: () => void;
}
interface PopupState {
    currentIndex: number;
    currentImage: JSX.Element[];
}
export default class Popup extends React.Component<PopupProps, PopupState> {
    public constructor(props: PopupProps) {
        super(props);
        this.state = {
            currentImage: [<img key={this.props.current} src={this.props.images[this.props.current]}/>],
            currentIndex: this.props.current
        };
    }
    public render() {
        return (
            <div className="image-viewer-popup">
                <div className="overlay"/>
                <div className="content"><div className="controls close" onClick={this.props.onClose}><FontAwesome name="times"/></div>{this.state.currentImage.map((image) => image)}</div>
                <div className="controls next" onClick={this.changeImage.bind(this, true)}><FontAwesome name="chevron-right"/></div>
                <div className="controls prev" onClick={this.changeImage.bind(this, false)}><FontAwesome name="chevron-left"/></div>
            </div>
        );
    }
    private changeImage(forward: boolean) {
        let currentIndex = (forward) ? this.state.currentIndex + 1 : this.state.currentIndex - 1;
        if (currentIndex >= this.props.images.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = this.props.images.length - 1;
        }
        this.setState({
            currentIndex
        });
        this.state.currentImage.push(<img key={this.state.currentIndex} src={this.props.images[this.state.currentIndex]}/>);
        this.state.currentImage.shift();
    }
}
