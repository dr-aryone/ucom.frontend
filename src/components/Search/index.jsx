import React, { Fragment, useState, useEffect } from 'react';
import Popup from '../Popup';
import styles from './styles.css';
import debounce from '../../utils/debounce';
import urls from '../../utils/urls';
import loader from '../../utils/loader';
import api from '../../api';

const { getPagingLink } = urls;

const SearchPopup = (props) => {
  // const searchInput = createRef();
  const [popup, showPopup] = useState(false);
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });
  // const urlParams = new URLSearchParams(props.location.search);
  const [userName, setUserName] = useState('');
  const page = 1;
  const sortBy = '-current_rate';
  const perPage = 7;
  // const userName = urlParams.get('userName') || '';
  const usersParams = {
    page, sortBy, perPage, userName,
  };
  const onChangeSearch = (userName) => {
    props.history.push(getPagingLink({
      ...usersParams, userName, page: 1, perPage: 7,
    }));
  };
  const debouncedSetSearch = debounce(onChangeSearch, 500);

  const getData = async (params) => {
    loader.start();

    try {
      const data = await api.getUsers(params);
      setUsersData(data);
    } catch (e) {
      console.error(e);
    }

    loader.done();
  };

  useEffect(() => {
    getData({
      page, perPage, sortBy, userName,
    });
  }, [userName]);

  useEffect(() => {
    debouncedSetSearch(userName);
  }, [userName]);

  const { data: users } = usersData;

  console.log(usersData);

  return (
    <Fragment>
      <div className={styles.search}>
        <input
          // ref={this.searchInput}
          onClick={() => showPopup(!popup)}
          onChange={(e) => {
            setUserName(e.target.value);
            debouncedSetSearch(e.target.value);
          }}
          className={styles.input}
          placeholder="Search for people, oragnizations, communities, tags, or @accounts in U°OS blockchain…"
        />
      </div>
      <div className="layout__search">s
      </div>

      {popup && (
        <Popup onClick={() => showPopup(!popup)}>
          <div className={styles.popup}>
            <div className={styles.column}>
              <div className={styles.columnTitle}>Members</div>
              {users && users.length > 0 &&
                users.map(item => (
                  <div>{item.id}</div>
                ))
              }
            </div>
          </div>
        </Popup>
      )}

    </Fragment>
  );
};

export default SearchPopup;
