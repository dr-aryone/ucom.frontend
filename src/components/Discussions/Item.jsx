import { SortableElement } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import CommentIcon from '../Icons/Comment';
import styles from './styles.css';
import DropdownMenu from '../DropdownMenu';
import { copyToClipboard } from '../../utils/text';

const Item = props => (
  <div>
    <div
      className={classNames({
        [styles.item]: true,
        [styles.hidden]: props.hidden,
        [styles.editable]: props.editable,
      })}
    >
      <div className={styles.main}>
        <div className={styles.title}>
          <Link to={props.url} className="link red">{props.title}</Link>
        </div>
        <div className={styles.author}>
          by <Link to={props.authorUrl} className="link red">{props.author}</Link>
        </div>
      </div>
      <div className={styles.count}>
        {props.commentCount} <CommentIcon />
      </div>
      {props.editable &&
        <div className={styles.itemMenu}>
          <DropdownMenu
            items={[{
              title: 'Remove',
              onClick: () => props.onClickRemove(props.id),
            }, {
              title: 'Copy Link',
              onClick: () => copyToClipboard(`${document.location.origin}${props.url}`),
            }]}
          />
        </div>
      }
    </div>
  </div>
);

export const itemPropsTypes = {
  id: PropTypes.number.isRequired,
  hidden: PropTypes.bool,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  commentCount: PropTypes.number,
  onClickRemove: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

Item.propTypes = itemPropsTypes;

Item.defaultProps = {
  hidden: false,
  commentCount: 0,
  editable: false,
};

export default SortableElement(Item);
