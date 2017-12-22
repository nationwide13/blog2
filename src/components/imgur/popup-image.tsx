import * as React from 'react';

interface PopupImageProps {
    url: string;
    forward: boolean;
    onComplete: () => void;
}
interface PopupImageState {
    position: number;
}
export default class PopupImage extends React.Component<PopupImageProps, PopupImageState> {
    public render() {
        return(
            <img src={this.props.url}/>
        );
    }
}
