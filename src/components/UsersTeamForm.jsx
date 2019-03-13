import classNames from 'classnames';
import { uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import UserSearchInput from './UserSearchInput';
import UserCard from './UserCard';
import IconRemove from './Icons/Remove';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';
import { getUsersTeamStatusById } from '../utils/organization';
import {
  USERS_TEAM_STATUS_ID_CONFIRMED,
  USERS_TEAM_STATUS_ID_DECLINED,
} from '../store/organization';

const UsersTeamForm = props => (
  <div className="board-form">
    <div className="board-form__input">
      <UserSearchInput
        isMulti
        value={[]}
        onChange={(data) => {
          if (typeof props.onChange === 'function') {
            const users = uniqBy(props.users.concat(data), item => item.id);
            props.onChange(users);
          }
        }}
      />
    </div>
    <div className="board-form__list">
      <div className="user-cards-list">
        {props.users.map((item, index) => (
          <div className="user-cards-list__item" key={item.id}>
            <div className="toolbar">
              <div className="toolbar__main">
                <UserCard
                  userName={getUserName(item)}
                  accountName={item.accountName}
                  avatarUrl={urls.getFileUrl(item.avatarFilename)}
                  profileLink={urls.getUserUrl(item.id)}
                />
              </div>
              <div className="toolbar__side">
                <div className="inline">
                  <div className="inline__item">
                    <div
                      className={classNames(
                        'user-cards-list__status',
                        { 'user-cards-list__status_confirmed': item.usersTeamStatus === USERS_TEAM_STATUS_ID_CONFIRMED },
                        { 'user-cards-list__status_declined': item.usersTeamStatus === USERS_TEAM_STATUS_ID_DECLINED },
                      )}
                    >
                      {getUsersTeamStatusById(item.usersTeamStatus)}
                    </div>
                  </div>
                  <div className="inline__item">
                    <div className="user-cards-list__remove">
                      <button
                        className="button-clean"
                        onClick={() => {
                          if (typeof props.onChange === 'function') {
                            const users = [].concat(props.users);
                            users.splice(index, 1);
                            props.onChange(users);
                          }
                        }}
                      >
                        <IconRemove />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

UsersTeamForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

UsersTeamForm.defaultProps = {
  users: [],
};

export default UsersTeamForm;
