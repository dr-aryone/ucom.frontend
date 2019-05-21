import PropTypes from 'prop-types';
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import styles from './styles.css';
import SortableItem, { Item } from './Item';

const List = props => (
  <div className={styles.list}>
    {props.items.map((item, index) => (
      <SortableItem
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
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
};

List.defaultProps = {
  items: [],
  editable: false,
  disabled: false,
};

export default SortableContainer(List);
