import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import urls from '../utils/urls';
import { getUserById } from '../store/users';
import { updateUser } from '../actions/users';
import { selectUser } from '../store/selectors/user';
import Popup from '../components/Popup/';
import Content from '../components/Popup/Content';
import VerticalMenu from '../components/VerticalMenu';
import styles from './Profile.css';
import DropZone from '../components/DropZone';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import Button from '../components/Button/index.jsx';
import Avatar from '../components/EntryHeader/Avatar';
// import SocialNetworks from '../components/SN';
import { validateFields } from '../utils/validateFields';

const Profile = (props) => {
  // Object.keys(props.user).length
  const owner = getUserById(props.users, props.user.id);

  if (!owner) {
    return null;
  }

  const [userData, setUserData] = useState(owner);
  const [errors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);
  const [sites, setSites] = useState([]);
  // const [socialNetworks, SocialNetworks] = useState([]);

  // useEffect(() => [], [user]);
  // const validateUserData = () => {
  //   validateFields();
  // };

  useEffect(() => {
    console.log('userData: ', userData);
    setUserData({
      ...userData,
      nickname: owner.nickname,
      avatarFilename: owner.avatarFilename,
      about: owner.about,
      personalWebsiteUrl: owner.personalWebsiteUrl,
      usersSources: owner.usersSources,
    });
  }, (owner));

  console.log(userData || 'false');

  console.log('sites: ', sites.map((value, index) => console.log(index, value.sourceUrl)));
  console.log('sss: ', sites);

  return (
    <div className={styles.page}>
      <Popup onClickClose={props.onClickClose}>
        <Content onClickClose={() => {}}>
          <div className={styles.profile}>
            <div className={styles.sidebar}>
              <VerticalMenu
                sections={[
                  { name: 'PersonalInfo', title: 'Personal info' },
                  { name: 'AboutMe', title: 'About Me' },
                  { name: 'Links', title: 'Links' },
                ]}
              />
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
                      {/* <DropZone
                        onDrop={files => this.props.userFormSetForm({ avatarFilename: files[0] })}
                        text="Add or drag img"
                      /> */}
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
                    <div className={styles.label}>Website</div>
                    <div className={styles.inputBlock}>
                      {sites.length !== 0 && sites.map((value, index) => (
                        <TextInput
                          touched
                          key={index}
                          value={value.sourceUrl}
                          onChange={sourceUrl => setSites(Object.assign([], sites, { [index]: { ...sites[index], sourceUrl } }))}
                          // className={styles.input}
                        />
                      ))}
                      <Button
                        small
                        grayBorder
                        onClick={() => setSites([...sites, { sourceUrl: '' }])}
                      >
                        Add site
                      </Button>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Social Networks</div>
                    <div className={styles.inputBlock}>
                      <TextInput
                      // className={styles.input}
                      />
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
