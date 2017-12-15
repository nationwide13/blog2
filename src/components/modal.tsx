import * as React from 'react';

interface ModalProps {
    onCancel?: () => void;
    dismissable?: boolean;
    children: JSX.Element;
    footer?: JSX.Element;
}
export default class Modal extends React.Component<ModalProps> {

}
