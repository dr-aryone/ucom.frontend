import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import { Element } from 'react-scroll';
import urls from '../utils/urls';
import { getUserById } from '../store/users';
import { selectUser } from '../store/selectors';
import Popup from '../components/Popup/';
import Content from '../components/Popup/Content';
import VerticalMenu from '../components/VerticalMenu';
import styles from './Profile.css';
import DropZone from '../components/DropZone';
import Textarea from '../components/Textarea';

const Profile = (props) => {
  // Object.keys(props.user).length
  const user = getUserById(props.users, props.user.id);
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <div>
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

              <div className={styles.section}>
                <Element name="PersonalInfo">
                  <h3 className={styles.title}>Personal Info</h3>
                  <div className={styles.label}>Avatar</div>
                  <div className={styles.inputBlock}>
                    {/* avatarFilename && typeof avatarFilename === 'object' ? (
                      <AvatarFromFile size="big" file={avatarFilename} />
                    ) : (
                      <Avatar size="big" src={urls.getFileUrl(avatarFilename)} />
                    )*/}
                    <DropZone
                      onDrop={files => this.props.userFormSetForm({ avatarFilename: files[0] })}
                      text="Add or drag img"
                    />
                  </div>
                  <div className="field__section">
                    <div className="field__hint">
                      You can upload an image in JPG or PNG format. Size is not more than 1 mb.
                    </div>
                  </div>

                  <div className={styles.field}>
                    <div className={styles.label}>Displayed name</div>
                    <div className={styles.inputBlock}>
                      <input
                        placeholder="Nickname or name, maybe emoji…"
                        className={styles.input}
                        value={user.nickname}
                      />
                    </div>
                  </div>
                </Element>
                <Element name="AboutMe">
                  <h3 className={styles.title}>About Me</h3>
                  <div className={styles.textarea}>
                    <Textarea
                      placeholder="Your story, what passions you — something you want others to know about you"
                      rows={6}
                      // value={user.nickname}
                      // onChange={about => this.props.userFormSetForm({ about })}
                      isMentioned
                    />
                  </div>
                </Element>
                <Element name="Links">
                  <h3 className={styles.title}>Links</h3>
                  <div className={styles.field}>
                    <div className={styles.label}>Website</div>
                    <div className={styles.inputBlock}>
                      <input className={styles.input} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Social Networks</div>
                    <div className={styles.inputBlock}>
                      <input className={styles.input} />
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

export default connect(
  state => ({
    users: state.users,
    user: selectUser(state),
  }),
  {},
)(Profile);
