import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import urls from '../utils/urls';
import { getUserById } from '../store/users';
import { addUsers, updateUser } from '../actions/users';
import { selectUser } from '../store/selectors/user';
import Popup from '../components/Popup';
import Content from '../components/Popup/Content';
import VerticalMenu from '../components/VerticalMenu/index';
import styles from './Profile.css';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import Button from '../components/Button/index.jsx';
import Avatar from '../components/EntryHeader/Avatar';
import SocialNetworks from '../components/SocialNetworks';
import { validator, isValid } from '../utils/validateFields';
import { settingsShow } from '../actions/settings';

const Profile = (props) => {
  const owner = getUserById(props.users, props.user.id);

  if (!owner) {
    return null;
  }

  const [userData, setUserData] = useState(owner);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUserData({
      ...userData,
      id: owner.id,
      firstName: owner.firstName,
      avatarFilename: owner.avatarFilename,
      about: owner.about,
      personalWebsiteUrl: owner.personalWebsiteUrl,
      usersSources: owner.usersSources || [],
    });
  }, (owner));

  const saveProfile = () => {
    userData.usersSources = userData.usersSources.filter(e => (e.sourceUrl));
    const checkError = validator(userData);
    setErrors(checkError);

    if (isValid(checkError)) {
      props.updateUser(userData);
      props.onClickClose();
    }
  };

  return (
    <div className={styles.page}>
      <Popup
        id="profile-popup"
        onClickClose={props.onClickClose}
        paddingBottom="50vh"
      >
        <Content onClickClose={props.onClickClose}>
          <div className={styles.profile}>
            <div>
              <div className={styles.sidebar}>
                <VerticalMenu
                  sections={[
                    { name: 'PersonalInfo', title: 'Personal info' },
                    { name: 'AboutMe', title: 'About Me' },
                    { name: 'Links', title: 'Links' },
                  ]}
                  scrollerOptions={{
                    spy: true,
                    duration: 500,
                    delay: 100,
                    offset: -110,
                    smooth: true,
                    containerId: 'profile-popup',
                  }}
                />
                {owner ? (
                  <div className={styles.btnSave}>
                    <Button
                      onClick={() => saveProfile()}
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className={styles.btnSave}><Button red>Create</Button></div>
                )}
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.title}>{owner ? 'Edit Your Profile' : 'Your Profile'}</h2>
                {/* <p>Few words about profile its how it will affect autoupdates and etc. Maybe some tips)</p> */}
              </div>

              <div>
                <Element name="PersonalInfo" className={styles.section}>
                  <h3 className={styles.title}>Personal Info</h3>
                  <div className={styles.field}>
                    <div className={styles.label}>Avatar</div>
                    <div className={styles.avatarBlock}>
                      <div className={styles.avatar}>
                        <Avatar
                          src={urls.getFileUrl(owner.avatarFilename)}
                          changeEnabled
                          onChange={async (file) => {
                            props.addUsers([{
                              id: +userData.id,
                              avatarFilename: file.preview,
                            }]);
                            props.updateUser({
                              id: +userData.id,
                              avatarFilename: file,
                            });
                          }}
                        />
                      </div>
                      <div>
                        Drag and drop. We support JPG, PNG or GIF files. Max file size 5 Mb.
                      </div>
                    </div>
                  </div>
                  <div className={classNames(styles.field, styles.fieldRequired)}>
                    <div className={styles.label}>Displayed name</div>
                    <div className={styles.inputBlock}>
                      <TextInput
                        topLabel
                        isRequired
                        placeholder="Nickname or name, maybe emoji…"
                        error={errors.firstName}
                        value={userData.firstName}
                        onChange={value => setUserData({ ...userData, firstName: value })}
                      />
                    </div>
                  </div>
                </Element>
                <Element name="AboutMe" className={styles.section}>
                  <h3 className={styles.title}>About Me</h3>
                  <div className={styles.textarea}>
                    <Textarea
                      placeholder="Your story, what passions you — something you want others to know about you"
                      rows={6}
                      value={userData.about}
                      onChange={value => setUserData({ ...userData, about: value })}
                      isMentioned
                    />
                  </div>
                </Element>
                <Element name="Links" className={styles.section}>
                  <h3 className={styles.title}>Links</h3>
                  <div className={classNames(styles.field, styles.fieldRequired)}>
                    <div className={styles.label}>My Website</div>
                    <div className={styles.inputBlock}>
                      <TextInput
                        error={errors.personalWebsiteUrl}
                        value={userData.personalWebsiteUrl}
                        onChange={value => setUserData({ ...userData, personalWebsiteUrl: value })}
                        placeholder="https://site.com"
                      />
                    </div>
                  </div>
                  <SocialNetworks
                    fields={userData.usersSources}
                    onChange={value => setUserData({ ...userData, usersSources: value })}
                    errors={errors && errors.usersSources}
                  />
                </Element>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.link}>Go to
              <div
                className="link red"
                role="presentation"
                onClick={() => {
                props.onClickClose();
                props.settingsShow();
              }}
              > Account Settings
              </div>
            </div>
          </div>
        </Content>
      </Popup>
    </div>
  );
};

Profile.propTypes = {
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  updateUser: PropTypes.func.isRequired,
  addUsers: PropTypes.func.isRequired,
  onClickClose: PropTypes.func,
  settingsShow: PropTypes.func,
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
    userData: state.userData,
  }),
  dispatch => bindActionCreators({
    addUsers,
    updateUser,
    settingsShow,
  }, dispatch),
)(Profile);
