import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Element } from 'react-scroll';
import urls from '../utils/urls';
import { getUserById } from '../store/users';
import { updateUser } from '../actions/users';
import { selectUser } from '../store/selectors/user';
import Popup from '../components/Popup/';
import Content from '../components/Popup/Content';
import VerticalMenu from '../components/VerticalMenu';
import styles from './Profile.css';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import Button from '../components/Button/index.jsx';
import Avatar from '../components/EntryHeader/Avatar';
// import SocialNetworks from '../components/SN';
import { validateFields } from '../utils/validateFields';
import IconRemove from '../components/Icons/Remove';

const Profile = (props) => {
  // Object.keys(props.user).length
  const owner = getUserById(props.users, props.user.id);

  if (!owner) {
    return null;
  }

  const [userData, setUserData] = useState(owner);
  // const [usersSources, setUsersSources] = useState(userData.setUsersSources);
  const [errors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [socialNetworks, setSocialNetworks] = useState(userData.usersSources || []);

  // useEffect(() => [], [user]);
  // const validateUserData = () => {
  //   validateFields();
  // };
  const addSocialInput = (index, value) => {
    // sourceUrl => setSocialNetworks(Object.assign([], socialNetworks, { [index]: { ...socialNetworks[index], sourceUrl } }))

    // setUserData({ ...userData, usersSources: Object.assign([], userData.usersSources, { [index]: { 'sourceUrl': value } }) });
    // console.log('data: ', userData);

    // setUserData({ ...userData, socialNetworks: Object.assign([], userData.usersSources, { [index]: { ...socialNetworks[index], value } }) });
    // console.log('data: ', userData);

  };

  useEffect(() => {
    setUserData({
      ...userData,
      nickname: owner.nickname,
      avatarFilename: owner.avatarFilename,
      about: owner.about,
      personalWebsiteUrl: owner.personalWebsiteUrl,
      usersSources: owner.usersSources,
    });
  }, (owner));

  // useEffect(() => {
  //   setUserData([...userData.usersSources, socialNetworks]);
  // }, (socialNetworks));

  // console.log('sites: ', socialNetworks.map((value, index) => console.log(index, value.sourceUrl)));
  console.log('sss: ', socialNetworks);
  console.log(userData.usersSources);

  return (
    <div className={styles.page}>
      <Popup onClickClose={props.onClickClose}>
        <Content onClickClose={() => {}}>
          <div className={styles.profile}>
            <div className={styles.sidebar}>
              <VerticalMenu
                sticky
                sections={[
                  { name: 'PersonalInfo', title: 'Personal info' },
                  { name: 'AboutMe', title: 'About Me' },
                  { name: 'Links', title: 'Links' },
                ]}
              />
              {owner ? (
                <div className={styles.btnSave}><Button>Save Changes</Button></div>
              ) : (
                <div className={styles.btnSave}><Button red>Save Changes</Button></div>
              )}
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.title}>Edit Your Profile </h2>
                <p>Few words about profile its how it will affect autoupdates and etc. Maybe some tips)</p>
              </div>

              <div>
                <Element name="PersonalInfo" className={styles.section}>
                  <h3 className={styles.title}>Personal Info</h3>
                  <div className={styles.field}>
                    <div className={styles.label}>Avatar</div>
                    <div className={styles.avatarBlock}>
                      <div className={styles.avatar}>
                        <Avatar
                          src={urls.getFileUrl(userData.avatarFilename)}
                          changeEnabled
                          onChange={async (file) => {
                            setUserData({ ...userData, avatarFilename: file.preview });
                            props.updateUser({
                              avatarFilename: file,
                            });
                          }}
                        />
                      </div>
                      <div>
                        Drag and drop. We support JPG, PNG or GIF files. Max file size 0,5 Mb.
                      </div>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Displayed name</div>
                    <div className={styles.inputBlock}>
                      <TextInput
                        placeholder="Nickname or name, maybe emoji…"
                        // className={styles.input}
                        value={userData.nickname}
                        onChange={value => setUserData({ ...userData, nickname: value })}
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
                  <div className={styles.field}>
                    <div className={styles.label}>My Website</div>
                    <div className={styles.inputBlock}>
                      <TextInput
                      // className={styles.input}
                        value={userData.personalWebsiteUrl}
                        onChange={value => setUserData({ ...userData, personalWebsiteUrl: value })}
                      />
                    </div>
                  </div>
                  <div className={classNames(styles.field, styles.fieldSoical)}>
                    <div className={styles.label}>Social Networks</div>
                    <div className={styles.inputBlock}>
                      {socialNetworks.length !== 0 && socialNetworks.map((value, index) => (
                        <div className={styles.inputBlockSocial} key={index}>
                          <TextInput
                            touched
                            value={value.sourceUrl}
                            onChange={sourceUrl => setSocialNetworks(Object.assign([], socialNetworks, { [index]: { ...socialNetworks[index], sourceUrl } }))}
                            // onChange={sourceUrl => setUserData({ ...userData, usersSources: Object.assign([], userData.usersSources, { [index]: { ...userData.usersSources[index], sourceUrl } }) })}
                            className={styles.input}
                          />
                          <div
                            role="presentation"
                            className={styles.trashIcon}
                            // onClick={() => this.removeField(index)}
                            onClick={() => setSocialNetworks([...socialNetworks.filter((_, i) => index !== i)])}
                          >
                            <IconRemove />
                          </div>
                        </div>
                      ))}
                      <Button
                        small
                        grayBorder
                        onClick={() => setSocialNetworks([...socialNetworks, { sourceUrl: '' }])}
                      >
                        Add Another
                      </Button>
                    </div>
                  </div>
                </Element>
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
};

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    updateUser,
  }, dispatch),
)(Profile);
