import { compact } from 'lodash';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Rate from './Rate';
import EditIcon from './Icons/Edit';
import Tags from './Tags';
import { sanitizeText } from '../utils/text';

const PostItem = (props) => {
  const LinkTag = props.url ? Link : 'span';

  return (
    <div className="post-item">
      {props.coverImg && (
        <div className="post-item__cover">
          <LinkTag to={props.url}>
            <img className="post-item__img" src={props.coverImg} alt="" />
          </LinkTag>
        </div>
      )}

      <div className="post-item__main">
        {compact(props.tags).length > 0 && (
          <div className="post-item__tags">
            <Tags tags={props.tags} />
          </div>
        )}

        <div className="post-item__text">
          {props.editUrl && (
            <Link to={props.editUrl}>
              <span className="post-item__edit">
                <EditIcon />
              </span>
            </Link>
          )}

          <LinkTag to={props.url} dangerouslySetInnerHTML={{ __html: sanitizeText(props.title) }} />
        </div>
      </div>

      <div className="post-item__side">
        {props.rate && (
          <div className="post-item__rate">
            <Rate value={+props.rate} />
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  coverImg: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  editUrl: PropTypes.string,
  rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  url: PropTypes.string,
};

PostItem.defaultProps = {
  coverImg: null,
  title: '',
  tags: [],
  editUrl: '',
  rate: null,
  url: '',
};

export default PostItem;
