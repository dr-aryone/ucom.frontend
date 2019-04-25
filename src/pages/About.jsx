import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import AboutGeneralInfoPage from './About/AboutGeneralInfo';
import LayoutBase from '../components/Layout/LayoutBase';
import Tabs from '../components/Tabs';

const AboutPage = props => (
  <LayoutBase>
    <div className="content-wrapper">
      <div className="content content_base">
        <div className="content__inner">
          <div className="nav-bar">
            <div className="nav-bar__title">
              <h1 className="title">About</h1>
            </div>
            <Tabs
              noBorder
              items={[{
                title: 'General Info',
                url: '/about/general-info',
                active: props.location.pathname === '/about/general-info',
              }]}
            />
          </div>
        </div>

        <hr className="content__separator" />

        <div className="content__inner">
          <Fragment>
            <Route path="/about" render={() => <Redirect to="/about/general-info" />} />
            <Route exact path="/about/general-info" component={AboutGeneralInfoPage} />
          </Fragment>
        </div>
      </div>
    </div>

    <div className="content">
      <div className="content__inner">
        <Footer />
      </div>
    </div>
  </LayoutBase>
);

AboutPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default AboutPage;
