import React, { Component, SyntheticEvent, RefObject } from 'react';
import BobbaEnvironment from '../../../bobba/BobbaEnvironment';
import { connect } from 'react-redux';
const initialState = {
    chat: '',
};
type FooterProps = {
    loginContext: any,
};
type FooterState = {
    chat: string;
};
class Footer extends Component<FooterProps, FooterState> {

    chatInput: RefObject<HTMLInputElement>;
    constructor(props: FooterProps) {
        super(props);
        this.state = initialState;
        this.chatInput = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('keydown', this.focusChatInput);
    }

    focusChatInput = () => {
        const { loggedIn } = this.props.loginContext;
        if (loggedIn && this.chatInput.current != null) {
            this.chatInput.current.focus();
        }
    }

    handleSubmit = (event: SyntheticEvent) => {
        const { chat } = this.state;
        event.preventDefault();

        if (chat.length > 0) {
            BobbaEnvironment.getGame().uiManager.doChat(chat);
        }

        this.setState(initialState);
    }

    handleInputChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        } as FooterState);
    }

    render() {
        const { chat } = this.state;
        return (
            <footer>
                <div className="footer_container">
                    <div className="left_section">
                        <button>
                            <img src="images/bottom_bar/logo.png" alt="Return" />
                        </button>
                        <button>
                            <img src="images/bottom_bar/rooms.png" alt="Rooms" />
                        </button>
                        <button>
                            <img src="images/bottom_bar/shop.png" alt="Shop" />
                        </button>
                        <button>
                            <img src="images/bottom_bar/inventory.png" alt="Me" />
                        </button>
                    </div>
                    <div className="middle_section">
                        <button>
                            <img src="images/bottom_bar/ghosthead.png" alt="Me" />
                        </button>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" ref={this.chatInput} name="chat" value={chat} autoComplete="off" placeholder="Click here to chat" onChange={this.handleInputChange} />
                            <button>
                                <img src="images/bottom_bar/chat_styles.png" alt="Chat styles" />
                            </button>
                        </form>
                    </div>
                    <div className="right_section">
                        <button>
                            <img src="images/bottom_bar/all_friends.png" alt="Friends" />
                        </button>
                        <button>
                            <img src="images/bottom_bar/messenger.png" alt="Messenger" />
                        </button>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loginContext: state.login,
});

export default connect(mapStateToProps)(Footer);
