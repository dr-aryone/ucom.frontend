import React, { Fragment, useState, useEffect } from 'react';
import Popup from '../Popup';
import styles from './styles.css';
import debounce from '../../utils/debounce';
import api from '../../api';
import urls from '../../utils/urls';
import loader from '../../utils/loader';
import UserCardLine from '../UserCardLine/UserCardLine';
import { getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';
import Arrow from '../Icons/ArrowLeft';
import IconSearch from '../Icons/Search';
import IconClose from '../Icons/Close';
import IconDuck from '../Icons/Socials/Duck';

const SearchPopup = () => {
  // const [popup, showPopup] = useState(false);
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });
  const [userName, setUserName] = useState('');
  const page = 1;
  const sortBy = '-current_rate';
  const perPage = usersData.data.length || 10;
  const usersParams = {
    page, sortBy, perPage, userName,
  };
  const closeSearch = () => (console.log('lol'));

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

  const onChangeSearch = (userName) => {
    getData({
      ...usersParams, userName, page: 1, perPage: 10,
    });
  };
  const debouncedSetSearch = debounce(onChangeSearch, 500);

  useEffect(() => {
    if (userName !== undefined) {
      debouncedSetSearch(userName);
    }
  }, [userName]);

  const usersCount = usersData.data;
  const users = [...usersCount];
  users.splice(7);

  return (
    <Fragment>
      <div className={styles.search}>
        <div className={styles.iconSearch}>
          <IconSearch />
        </div>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
            debouncedSetSearch(e.target.value);
            // showPopup(!popup);
          }}
          className={styles.input}
          placeholder="Search for people, oragnizations, communities, tags, or @accounts in U°OS blockchain…"
          type="text"
          spellCheck="false"
          onBlur={() => closeSearch()}
        />
        <div
          role="presentation"
          className={styles.iconClose}
        >
          <IconClose />
        </div>
      </div>

      {userName !== '' && (
        <Popup>
          <div className={styles.popup}>
            <div className={styles.column}>
              <div className={styles.columnTitle}>Members</div>
              {users && users.length > 0 &&
                users.map(item => (
                  <Fragment>
                    <UserCardLine
                      url={urls.getUserUrl(item.id)}
                      userPickSrc={getFileUrl(item.avatarFilename)}
                      name={getUserName(item)}
                      accountName={item.accountName}
                      rate={item.currentRate}
                      sign="@"
                      // userId={item.id}
                    />
                  </Fragment>
                ))
              }
              {usersCount.length > 7 &&
                <a href="/users" className={styles.viewAll}>
                  <div className={styles.viewAllText}>View all</div>
                  <div className={styles.arrowRed}><Arrow /></div>
                </a>
              }
            </div>
            <a href="#" className={styles.footer}>
              <div className={styles.searchLink}>Locate “{userName}” in posts and publications<span className={styles.iconDuck}><IconDuck /></span><span className={styles.arrowGrey}><Arrow /></span></div>
            </a>
          </div>
        </Popup>
      )}

    </Fragment>
  );
};

export default SearchPopup;
