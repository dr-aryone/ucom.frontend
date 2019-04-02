import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { sanitizeCommentText, checkMentionTag } from '../utils/text';

const MinimizedText = props => (
  <div
    className={classNames({
      'text': true,
      'text_gray': props.gray,
    })}
  >
    <div
      className={classNames(
        'text__content',
        { 'text__content_minimized': props.enabled && props.minimized },
      )}
    >
      <p dangerouslySetInnerHTML={{
          __html: sanitizeCommentText(checkMentionTag(props.text)),
        }}
      />
    </div>

    {props.enabled ? (
      <Fragment>
        {props.disabledHide && !props.minimized ? null : (
          <div className="text__show-more">
            <button
              className="link red"
              onClick={() => {
                if (props.onClickShowMore) {
                  props.onClickShowMore();
                }
              }}
            >
              {props.minimized ? 'Show More' : 'Hide More'}
            </button>
          </div>
        )}
      </Fragment>
    ) : null}
  </div>
);

MinimizedText.propTypes = {
  enabled: PropTypes.bool,
  minimized: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClickShowMore: PropTypes.func,
  disabledHide: PropTypes.bool,
  gray: PropTypes.bool,
};

MinimizedText.defaultProps = {
  enabled: true,
  minimized: true,
  onClickShowMore: null,
  disabledHide: false,
  gray: false,
};

export default MinimizedText;
