import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './modal.css';

interface ModalProps {
    onDismiss: () => void;
    dismissable?: boolean;
    children: JSX.Element | string;
    className?: string;
    title?: string;
}

export default class Modal extends React.Component<ModalProps> {
    public static defaultProps: Partial<ModalProps> = {
        dismissable: true
    };
    public render() {
        return (
            <div className={`modal ${this.props.className ? this.props.className : ''}`}>
                <div onClick={this.props.dismissable ? this.props.onDismiss : () => null} className="modal-overlay"/>
                <div className="modal-content">
                    <div className="modal-header">{this.props.title ? this.props.title : ''}{this.props.dismissable && <FontAwesome name="times" className="modal-close" onClick={this.props.onDismiss}/>}</div>
                    <div className="modal-children">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
