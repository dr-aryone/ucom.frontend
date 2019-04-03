import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { addErrorNotification } from '../actions/notifications';
import { compressUploadedImage } from '../utils/upload';

const DropzoneWrapper = (props) => {
  const {
    addErrorNotification, children, onChange, multiple, ...rest
  } = props;
  return (
    <Dropzone
      {...rest}
      multiple={multiple}
      onDropAccepted={async (files) => {
        if (props.onChange) {
          try {
            if (multiple) {
              props.onChange(await Promise.all(files.map(file => compressUploadedImage(file))));
            } else {
              props.onChange(await compressUploadedImage(files[0]));
            }
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
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

DropzoneWrapper.defaultProps = {
  multiple: false,
};
