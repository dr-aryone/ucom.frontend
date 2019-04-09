import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import urls from '../utils/urls';
import { getUserById } from '../store/users';

const Profile = (props) => {
  const userId = 443;
  const owner = getUserById(props.users, userId);
  console.log(owner);

  return (
    <div>hi</div>
  );
};

export default connect(
  state => ({
    users: state.users,
    // user: selectUser(state),
  }),
  {},
)(Profile);
