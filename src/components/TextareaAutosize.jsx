import autosize from 'autosize';
import React, { useEffect, useRef } from 'react';
import TributeWrapper from './TributeWrapper';

const TextareaAutosize = (props) => {
  const textareaEl = useRef(null);

  useEffect(() => {
    autosize(textareaEl.current);

    return () => {
      autosize.destroy(textareaEl);
    };
  }, []);

  useEffect(() => {
    autosize.update(textareaEl.current);
  }, [props.value]);
  const { onChangeValue, ...rest } = props;
  return (
    <TributeWrapper onChange={e => onChangeValue(e)}>
      <textarea ref={textareaEl} {...rest} />
    </TributeWrapper>

  );
};

export default TextareaAutosize;
