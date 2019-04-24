import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Avatars from './Avatars';
import Popup from './Popup';
import ModalContent from './ModalContent';
import UserListPopup from './User/UserListPopup';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';

class Board extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
    };
  }
  componentWillReceiveProps(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.hidePopup();
    }
  }

  hidePopup = () => {
    this.setState({ popupVisible: false });
  }

  showPopup = () => {
    this.setState({ popupVisible: true });
  }

  render() {
    const { users } = this.props;
    const usersIds = users.map(item => item.id);

    return (
      <Fragment>
        {this.state.popupVisible && (
          <Popup onClickClose={this.hidePopup}>
            <ModalContent onClickClose={this.hidePopup}>
              <UserListPopup title={this.props.title} usersIds={usersIds} />
            </ModalContent>
          </Popup>
        )}
        {users.length && (
          <div className="board" role="presentation" onClick={this.showPopup}>
            <div className="board__avatars">
              <Avatars
                list={users.map(user => ({
                  id: user.id,
                  alt: getUserName(user),
                  avatarUrl: urls.getFileUrl(user.avatarFilename),
                  accountName: user.accountName,
                  rate: user.currentRate,
                  userName: getUserName(user),
                }))}
                orderStacking="fifo"
                distance="far"
                size="msmall"
                maxAvatarsAmount={8}
              />
            </div>
            <div className="board__title">{this.props.title}</div>
          </div>)
        }
      </Fragment>
    );
  }
}

Board.defaultProps = {
  users: [],
  title: 'Board',
};

Board.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default Board;
