import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Image from './index';
import { getBase64FromFile, FILE_OBJ } from '../../../utils/upload';

const ImageFromFile = ({ file, alt, onClickRemove }) => {
  const [base64, setBase64] = useState(null);

  useEffect(() => {
    getBase64FromFile(file).then(base64 => setBase64(base64));
  }, [file]);

  if (!base64) {
    return null;
  }

  return (
    <Image src={base64} alt={alt} onClickRemove={onClickRemove} />
  );
};

ImageFromFile.propTypes = {
  file: PropTypes.instanceOf(FILE_OBJ).isRequired,
  alt: PropTypes.string,
  onClickRemove: PropTypes.func,
};

ImageFromFile.defaultProps = {
  alt: null,
  onClickRemove: null,
};

export default ImageFromFile;
