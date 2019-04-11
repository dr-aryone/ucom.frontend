import React, { Fragment, useState } from 'react';
import Resources from '../Resources';
import Tokens from '../Resources/Tokens';

const MenuWallet = () => {
  const [route, setRoute] = useState(1);

  return (
    <Fragment>
      <div className="menu-wallet">
        <div className="nav-bar__menu">
          <div className="toolbar toolbar_responsive">
            <div className="toolbar__main menu_border">
              <div className="menu menu_simple-tabs_header">
                <div className="menu__item">
                  <div
                    className={`menu__link ${route === 1 ? 'menu__link_active' : ''}`}
                    onClick={() => setRoute(1)}
                    role="presentation"
                  >
                    Tokens
                  </div>
                </div>
                <div className="menu__item">
                  <div
                    className={`menu__link ${route === 2 ? 'menu__link_active' : ''}`}
                    onClick={() => setRoute(2)}
                    role="presentation"
                  >
                    Resources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {route === 1 &&
          <div className="menu-wallet__block">
            <Tokens />
          </div>
        }

        {route === 2 &&
          <div className="menu-wallet__block">
            <Resources />
          </div>
        }
      </div>
    </Fragment>
  );
};

export default MenuWallet;
