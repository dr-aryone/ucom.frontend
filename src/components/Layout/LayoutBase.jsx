import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
// import Header from '../Header/Header';
import Header from '../HeaderSimple';

const LayoutBase = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Header gray={props.gray} />

      <div
        className={classNames({
          'page__content': true,
          'page__content_gray': props.gray,
        })}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
  gray: PropTypes.bool,
};

LayoutBase.defaultProps = {
  gray: false,
};

export default LayoutBase;
