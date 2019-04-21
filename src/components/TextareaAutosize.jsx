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
  const { onChange, ...rest } = props;
  return (
    <TributeWrapper onChange={e => onChange(e)}>
      <textarea ref={textareaEl} {...rest} />
    </TributeWrapper>

  );
};

export default TextareaAutosize;
