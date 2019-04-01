import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import React, { PureComponent, Fragment } from 'react';
import { selectUser } from '../store/selectors/user';
import VerticalMenu from '../components/VerticalMenu';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import Footer from '../components/Footer';
import Button from '../components/Button';
import DropZone from '../components/DropZone';
import Avatar from '../components/Avatar';
import AvatarFromFile from '../components/AvatarFromFile';
import SocialNetworks from '../components/SocialNetworks';
import LayoutBase from '../components/Layout/LayoutBase';
import { userFormSetForm, userFormSetData, userFormHandleSubmit } from '../actions/userForm';
import urls from '../utils/urls';

class ProfilePage extends PureComponent {
  componentDidMount() {
    const {
      firstName, about, usersSources, personalWebsiteUrl, avatarFilename,
    } = this.props.user;

    this.props.userFormSetData({
      form: {
        firstName, about, usersSources, personalWebsiteUrl, avatarFilename,
      },
    });
  }

  render() {
    const {
      firstName, about, usersSources, personalWebsiteUrl, avatarFilename,
    } = this.props.userForm.form;
    const {
      errors, isValid, loading, saved,
    } = this.props.userForm;

    if (saved) {
      return <Redirect to={`/user/${this.props.user.id}`} />;
    }

    if (!this.props.user.id) {
      return <Redirect to="/" />;
    }

    return (
      <LayoutBase>
        <div className="content">
          <div className="content__inner content__inner_medium">
            <div className="content__title content__title_between">
              <h1 className="title">Edit Profile</h1>
              <Link to={`/user/${this.props.user.id}`} className="button button_theme_transparent button_size_small">
                Back to Profile
              </Link>
            </div>
          </div>

          <div className="content">
            <div className="content__inner">
              <Fragment>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.props.userFormHandleSubmit();
                  }}
                >
                  <div className="grid grid_settings">
                    <div className="grid__item grid__item_side">
                      <VerticalMenu
                        sections={[
                          { name: 'PersonalInfo', title: 'Personal info' },
                          { name: 'SocialNetworks', title: 'Social networks' },
                        ]}
                      />
                    </div>
                    <div className="grid__item grid__item_main">
                      <div className="fields">
                        <Element name="PersonalInfo">
                          <div className="fields__title">
                            <h1 className="title title_small">Personal info</h1>
                          </div>

                          <div className="fields__item">
                            <div className="field field_avatar">
                              <div className="field__label">
                                <div className="field__section">Avatar</div>
                                <div className="field__section">
                                  {avatarFilename && typeof avatarFilename === 'object' ? (
                                    <AvatarFromFile size="big" file={avatarFilename} />
                                  ) : (
                                    <Avatar size="big" src={urls.getFileUrl(avatarFilename)} />
                                  )}
                                </div>
                              </div>
                              <div className="field__input">
                                <div className="field__section">
                                  <DropZone
                                    onDrop={file => this.props.userFormSetForm({ avatarFilename: file })}
                                    text="Add or drag img"
                                  />
                                </div>
                                <div className="field__section">
                                  <div className="field__hint">
                                    You can upload an image in JPG or PNG format. Size is not more than 1 mb.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fields__item">
                            <div className="field">
                              <div className="field__label">Displayed name</div>
                              <div className="field__input">
                                <TextInput
                                  touched
                                  error={errors.firstName && errors.firstName[0]}
                                  value={firstName}
                                  onChange={firstName => this.props.userFormSetForm({ firstName })}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="fields__item">
                            <div className="field">
                              <div className="field__label">About me</div>
                              <div className="field__input">
                                <Textarea
                                  placeholder="Type something..."
                                  rows={6}
                                  value={about}
                                  onChange={about => this.props.userFormSetForm({ about })}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="fields__item">
                            <div className="field">
                              <div className="field__label">Your website</div>
                              <div className="field__input">
                                <TextInput
                                  touched
                                  value={personalWebsiteUrl}
                                  onChange={personalWebsiteUrl => this.props.userFormSetForm({ personalWebsiteUrl })}
                                  error={errors.personalWebsiteUrl && errors.personalWebsiteUrl[0]}
                                />
                              </div>
                            </div>
                          </div>
                        </Element>
                        <Element name="SocialNetworks">
                          <div className="fields__title">
                            <h1 className="title title_small">Social networks</h1>
                          </div>
                          <SocialNetworks
                            fields={usersSources}
                            onChange={usersSources => this.props.userFormSetForm({ usersSources })}
                            errors={errors}
                          />
                          <div className="fields__item">
                            <div className="field">
                              <div className="field__input">
                                <Button
                                  isStretched
                                  isUpper
                                  type="submit"
                                  text="submit"
                                  theme="red"
                                  size="big"
                                  isDisabled={!isValid || loading}
                                />
                              </div>
                            </div>
                          </div>
                        </Element>
                      </div>
                    </div>
                  </div>
                </form>
              </Fragment>

              <Footer />
            </div>
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default connect(
  state => ({
    user: selectUser(state),
    userForm: state.userForm,
  }),
  dispatch => bindActionCreators({
    userFormSetForm,
    userFormSetData,
    userFormHandleSubmit,
  }, dispatch),
)(ProfilePage);
