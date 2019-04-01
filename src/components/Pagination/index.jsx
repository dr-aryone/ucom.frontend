import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import React from 'react';
import styles from './styles.css';

// TODO: Remove ../Pagination.jsx old styles and replace on users.jsx
const PaginationWrapper = props => (
  <Pagination
    hideOnSinglePage
    className={styles.pagination}
    showTitle={false}
    total={props.totalAmount}
    pageSize={props.perPage}
    current={props.page}
    onChange={props.onChange}
    itemRender={(current, type, element) => {
      switch (type) {
        case 'prev':
          return <a>Prev</a>;
        case 'next':
          return <a>Next</a>;
        default:
          return element;
      }
    }}
  />
);

PaginationWrapper.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  totalAmount: PropTypes.number,
  onChange: PropTypes.func,
};

PaginationWrapper.defaultProps = {
  page: null,
  perPage: null,
  totalAmount: null,
  onChange: null,
};

export default PaginationWrapper;
