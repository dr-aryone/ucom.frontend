import React, { Fragment, useState } from 'react';
import Resources from '../Resources';
import Tokens from '../Resources/Tokens';
import Tabs from '../Tabs';

const MenuWallet = () => {
  const [route, setRoute] = useState(1);

  return (
    <Fragment>
      <div className="menu-wallet">
        <Tabs
          withIndent
          items={[{
            title: 'Tokens',
            onClick: () => setRoute(1),
            active: route === 1,
          }, {
            title: 'Resources',
            onClick: () => setRoute(2),
            active: route === 2,
          }]}
        />

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
