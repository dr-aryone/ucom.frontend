import PropTypes from 'prop-types';
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import styles from './styles.css';
import Item, { itemPropsTypes } from './Item';

const List = props => (
  <div className={styles.list}>
    {props.items.map((item, index) => (
      <Item
        key={item.id}
        disabled={props.disabled}
        index={index}
        editable={props.editable}
        {...{ ...item }}
      />
    ))}
  </div>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemPropsTypes)),
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
};

List.defaultProps = {
  items: [],
  editable: false,
  disabled: false,
};

export default SortableContainer(List);
