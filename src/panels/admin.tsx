import * as React from 'react';
import { DefaultProps } from '../constants/definitions';
import Modal from '../components/modal';
import { Auth } from 'aws-amplify';
import * as FontAwesome from 'react-fontawesome';

interface AdminState {
    modalOpen: boolean;
    form: {
        username: string;
        password: string;
    };
    loading: boolean;
    error: string;
}
export default class Admin extends React.Component<DefaultProps, AdminState> {
    public componentWillMount() {
        document.title = 'List Page';
    }
    public constructor(props: DefaultProps) {
        super(props);
        this.state = {
            error: '',
            form: {
                password: '',
                username: ''
            },
            loading: false,
            modalOpen: true
        };
    }
    public render() {
        return (
            <div>
                {this.state.modalOpen &&
                    <Modal title="Admin Login" onDismiss={this.modalClose}>
                        <div>
                            {!this.state.loading &&
                                <form onSubmit={this.handleSubmit}>
                                    <input onChange={this.updateField.bind(this, 'username')} value={this.state.form.username} type="text" name="username" placeholder="Username"/>
                                    <input onChange={this.updateField.bind(this, 'password')} value={this.state.form.password} type="password" name="password" placeholder="Password"/>
                                    <button type="submit">Login</button>
                                    {this.state.error && <p className="login-error">{this.state.error}</p>}
                                </form>
                            }
                            {this.state.loading && <FontAwesome className="spinner" name="spinner"/>}
                        </div>
                    </Modal>
                }
            </div>
        );
    }
    public modalClose = () => {
        this.setState({modalOpen: false });
    }
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        Auth.signIn(this.state.form.username, this.state.form.password).catch(() => {
            this.setState({
                error: 'Login failed. Please check your username and password',
                loading: false
            });
        });
    }
    public updateField = (data: string, event: React.FormEvent<HTMLInputElement>) => {
        const form = this.state.form;
        form[data] = event.currentTarget.value;
        this.setState({
            form
        });
    }
}
