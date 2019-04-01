import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { addErrorNotification } from '../actions/notifications';
import { compressUploadedImage } from '../utils/upload';

const DropzoneWrapper = (props) => {
  const {
    addErrorNotification, children, onChange, ...rest
  } = props;
  return (
    <Dropzone
      {...rest}
      onDropAccepted={async (files) => {
        if (props.onChange) {
          try {
            props.onChange(await compressUploadedImage(files[0]));
          } catch (e) {
            addErrorNotification(e);
          }
        }
      }}
    >
      {children}
    </Dropzone>
  );
};

export default connect(
  null,
  dispatch => bindActionCreators({
    addErrorNotification,
  }, dispatch),
)(DropzoneWrapper);

DropzoneWrapper.propTypes = {
  addErrorNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
