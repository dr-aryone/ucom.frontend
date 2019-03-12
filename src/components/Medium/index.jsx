/* eslint-disable global-require, new-cap */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { addErrorNotification } from '../../actions/notifications';
import TributeWrapper from '../TributeWrapper';
import './styles.css';

class Medium extends PureComponent {
  componentDidMount() {
    const MediumEditor = require('medium-editor');
    const MediumUpload = require('./Upload/index');
    const MediumPost = require('./Post/index');
    const MediumSurvey = require('./Survey/index');
    const MediumEmbed = require('./Embed/index');
    const FileDragging = require('./FileDragging');
    const ImageFromLink = require('./ImageFromLink');

    this.mediumEditor = new MediumEditor(this.el, {
      toolbar: {
        buttons: ['h1', 'h2', 'bold', 'italic', 'underline', 'strikethrough', 'anchor', 'quote', 'orderedlist', 'unorderedlist'],
      },
      placeholder: false,
      autoLink: true,
      extensions: {
        mediumEmbed: new MediumEmbed.default(),
        mediumSurvey: new MediumSurvey.default(),
        imageFromLink: new ImageFromLink.default(),
        fileDragging: new FileDragging.default({
          onError: message => this.props.addErrorNotification(message),
        }),
        mediumPost: new MediumPost.default(),
        mediumUpload: new MediumUpload.default({
          onError: message => this.props.addErrorNotification(message),
          onUploadStart: () => this.props.onUploadStart(),
          onUploadDone: () => this.props.onUploadDone(),
        }),
      },
    });

    if (this.props.value) {
      this.mediumEditor.setContent(this.props.value);
    }

    this.mediumEditor.subscribe('editableInput', () => {
      this.props.onChange(this.mediumEditor.getContent());
    });
  }

  componentDidUpdate() {
    if (this.props.value && this.props.value !== this.mediumEditor.getContent()) {
      this.mediumEditor.setContent(this.props.value);
    }
  }

  componentWillUnmount() {
    this.mediumEditor.destroy();
  }

  render() {
    return (
      <TributeWrapper onChange={e => this.props.onChange(e)}>
        <div className="post-content" ref={(el) => { this.el = el; }} />
      </TributeWrapper>
    );
  }
}

Medium.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onUploadStart: PropTypes.func.isRequired,
  onUploadDone: PropTypes.func.isRequired,
  addErrorNotification: PropTypes.func.isRequired,
};

Medium.defaultProps = {
  value: null,
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(Medium);
