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
    <div className={`header ${isScrolledHeader ? 'header_shadow' : ''} ${props.menuPopupVisibility ? 'header_grayed' : ''} ${props.tooltipVisibilty ? 'header_z-index' : ''}`} id="top">
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

export default withRouter(connect(state => ({
  user: selectUser(state),
  menuPopupVisibility: state.menuPopup.menuPopupVisibility,
  tooltipVisibilty: state.siteNotifications.tooltipVisibilty,
}))(Header));
