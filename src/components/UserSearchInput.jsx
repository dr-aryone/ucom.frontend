import humps from 'lodash-humps';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { components } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import UserOption from './UserOption';
import Close from './Icons/Close';
import api from '../api';
import { getUserName } from '../utils/user';
import urls from '../utils/urls';

const SelectUserOption = props => (
  <components.Option {...props}>
    <UserOption
      name={getUserName(props.data)}
      avatar={urls.getFileUrl(humps(props.data).avatarFilename)}
      nickname={props.data.accountName}
    />
  </components.Option>
);

const CloseButton = props => (
  <components.MultiValueRemove {...props}>
    <div className="dropdown__multi-value__remove">
      <Close size={9} />
    </div>
  </components.MultiValueRemove>
);

const Control = props => (
  <div
    className={classNames(
      'dropdown__control-wrapper',
      { 'dropdown__control-wrapper_opened': props.selectProps.menuIsOpen },
    )}
  >
    <components.Control {...props} />
  </div>
);

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <div
      className={classNames(
        'dropdown__arrow',
        { 'dropdown__arrow_up': props.selectProps.menuIsOpen },
      )}
    />
  </components.DropdownIndicator>
);

const Input = props => (
  <div className="dropdown__input-container">
    <components.Input {...props} />
  </div>
);

const UserSearchInput = ({
  onChange,
  value,
  isMulti,
  placeholder,
  loadOptions,
}) => (
  <div className="dropdown">
    <AsyncSelect
      value={value}
      isMulti={isMulti}
      isSearchable
      isClearable={false}
      placeholder={placeholder}
      className="dropdown"
      classNamePrefix="dropdown"
      loadOptions={loadOptions || api.searchUsers.bind(api)}
      getOptionLabel={data => getUserName(data)}
      getOptionValue={data => data.id}
      components={{
        MultiValueRemove: CloseButton,
        Control,
        DropdownIndicator,
        Option: SelectUserOption,
        Input,
      }}
      onChange={(options) => {
        if (typeof onChange === 'function') {
          onChange(options);
        }
      }}
    />
  </div>
);

UserSearchInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
};

UserSearchInput.defaultProps = {
  isMulti: true,
  placeholder: 'Find people',
  onChange: undefined,
  value: undefined,
};

export default UserSearchInput;
