import { Element } from 'react-scroll';
import PropTypes from 'prop-types';
import React from 'react';
import Popup, { Content } from '../Popup';
import styles from './styles.css';
import CopyPanel from '../CopyPanel';
import Button from '../Button/index';
import VerticalMenu from '../VerticalMenu/index';

const Settings = props => (
  <Popup onClickClose={props.onClickClose}>
    <Content onClickClose={() => {}}>
      <div className={styles.settings}>
        <div className={styles.sidebar}>
          <VerticalMenu
            sections={[{
              title: 'Resourses',
              name: 'Resourses',
            }, {
              title: 'Keys',
              name: 'Keys',
            }, {
              title: 'Referral Link',
              name: 'ReferralLink',
            }]}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>Account Settings</h2>
            <p>This section contains settings of your blockchain account.</p>
          </div>

          <Element className={styles.section} name="Keys">
            <h3 className={styles.title}>Keys</h3>
            <div className={styles.subSection}>
              <h4 className={styles.title}>Social Keys</h4>
              <p>The pair of Social Keys is needed to sign your social transactions. After authorization on the platform, it is stored in your browser.</p>
              <div className={styles.copy}>
                <CopyPanel
                  label="Private"
                  value="5JoEYU5adMz2GvfaacAntwPsZbFEzBMZafpTXJG6EkZf6dsKvjy"
                />
              </div>
              <div className={styles.copy}>
                <CopyPanel
                  label="Public"
                  value="5JoEYU5adMz2GvfaacAntwPsZbFEzBMZafpTXJG6EkZf6dsKvjy"
                />
              </div>
            </div>

            <div className={styles.subSection}>
              <h4 className={styles.title}>Password for Active Key</h4>
              <p>You can set a Password to save a pair of encrypted Active Keys in your browser. This allows you to send the transactions, that require Active Keys, using your Password instead. You will need to enter the Brainkey to unlock your Active Keys.</p>
              <div className={styles.action}>
                <Button strech small>Set Password</Button>
              </div>
            </div>

            <div className={styles.subSection}>
              <h4 className={styles.title}>Get Owner and Active key pairs with Brainkey</h4>
              <p>Here you can generate your keys from Brainkey.</p>
              <div className={styles.action}>
                <Button strech small>Show</Button>
              </div>
            </div>
          </Element>

          <Element name="ReferralLink" className={styles.section}>
            <h3 className={styles.title}>Referral Link</h3>
            <p>Provide a referral link to your friend and gain importance from your referrals, registered on the platform. You get half the importance they acquire.</p>
            <div className={styles.copy}>
              <CopyPanel
                label="Your referral link"
                value="u.community/invite4rom_KR"
              />
            </div>
          </Element>
        </div>
      </div>
    </Content>
  </Popup>
);

Settings.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default Settings;
