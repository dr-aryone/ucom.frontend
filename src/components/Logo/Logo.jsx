import React from 'react';
import classNames from 'classnames';
import IconLogo from '../Icons/Logo';
import MiniIconLogo from '../Icons/MiniLogo';

const Logo = props => (
  <div
    className={classNames(
      'logo',
      { [`logo_${props.mod}`]: Boolean(props.mod) },
    )}
  >
    <div className="logo__svg">
      {props.mod === 'small' ? <MiniIconLogo /> : <IconLogo />}
    </div>
    {/* <span className="logo__version">Alpha</span> */}
  </div>
);

export default Logo;
