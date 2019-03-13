import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import { triggerMenuPopup } from '../../actions/menuPopup';
import IconBurger from '../Icons/Burger';
import IconClose from '../Icons/Close';

const UserMenuTrigger = props => (
  <div className={`header-burger ${props.menuPopupVisibility ? 'header-burger_active' : ''}`} role="presentation" onClick={() => props.triggerMenuPopup()}>
    {props.menuPopupVisibility ? <IconClose /> : <IconBurger />}
  </div>
);

UserMenuTrigger.propTypes = {
  triggerMenuPopup: PropTypes.func,
  menuPopupVisibility: PropTypes.bool,
};

export default connect(
  state => ({
    menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  }),
  dispatch => bindActionCreators({
    triggerMenuPopup,
  }, dispatch),
)(UserMenuTrigger);
