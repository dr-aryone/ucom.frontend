import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import React, { useState, useEffect } from 'react';
import { selectUser } from '../../store/selectors';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import HeaderSide from './HeaderSide';
import HeaderMain from './HeaderMain';
import CreateEventPopup from '../CreateEventPopup';

const Header = (props) => {
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false);
  const [isScrolledHeader, setScrolledHeader] = useState(false);

  const checkScroll = () => {
    setScrolledHeader(window.top.scrollY > 0);
  };

  const throttledcheckScroll = throttle(checkScroll, 500);

  useEffect(() => {
    window.addEventListener('scroll', throttledcheckScroll);
    return () => window.removeEventListener('scroll', throttledcheckScroll);
  });

  return (
    <div
      id="top"
      className={classNames({
        'header': true,
        'header_shadow': isScrolledHeader,
        'header_grayed': props.menuPopupVisibility,
        'header_z-index': props.tooltipVisibilty,
        'header_gray': props.gray,
      })}
    >
      <div className="header__inner ">
        <HeaderSide />
        <HeaderMain />
      </div>
      {createPopupIsVisible && (
        <Popup onClickClose={() => setCreatePopupIsVisible(false)}>
          <ModalContent onClickClose={() => setCreatePopupIsVisible(false)}>
            <CreateEventPopup onClickClose={() => setCreatePopupIsVisible(false)} />
          </ModalContent>
        </Popup>
      )}
    </div>
  );
};

Header.propTypes = {
  menuPopupVisibility: PropTypes.bool,
  tooltipVisibilty: PropTypes.bool,
  gray: PropTypes.bool,
};

Header.defaultProps = {
  menuPopupVisibility: false,
  tooltipVisibilty: false,
  gray: false,
};

export default withRouter(connect(state => ({
  user: selectUser(state),
  menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
}))(Header));
