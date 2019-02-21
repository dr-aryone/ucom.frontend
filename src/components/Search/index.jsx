import React, { Fragment, useState, useEffect } from 'react';
import Popup from '../Popup';
import styles from './styles.css';
import debounce from '../../utils/debounce';
import urls from '../../utils/urls';
import loader from '../../utils/loader';
import api from '../../api';
import UserCardLine from '../UserCardLine/UserCardLine';
import { getUserById } from '../../store/users';
import { getUserName } from '../../utils/user';
import { getFileUrl } from '../../utils/upload';

const { getPagingLink } = urls;

const SearchPopup = () => {
  // const searchInput = createRef();
  const [popup, showPopup] = useState(false);
  const [usersData, setUsersData] = useState({ data: [], metadata: {} });
  // const urlParams = new URLSearchParams(props.location.search);
  const [userName, setUserName] = useState();
  const page = 1;
  const sortBy = '-current_rate';
  const perPage = usersData.data.length || 7;
  // const userName = urlParams.get('userName') || '';
  const usersParams = {
    page, sortBy, perPage, userName,
  };


  const getData = async (params) => {
    loader.start();

    try {
      const data = await api.getUsers(params);
      setUsersData(data);
      console.log('lol');
    } catch (e) {
      console.error(e);
    }

    loader.done();
  };

  const onChangeSearch = (userName) => {
    getData({
      ...usersParams, userName, page: 1, perPage: 7,
    });
  };
  const debouncedSetSearch = debounce(onChangeSearch, 500);

  // useEffect(() => {
  //   getData({
  //     page, perPage, sortBy, userName,
  //   });
  // }, [userName]);

  useEffect(() => {
    if (userName !== undefined) {
      debouncedSetSearch(userName);
    }
  }, [userName]);

  const users = usersData.data;

  // console.log(usersData);
  // console.log('users: ', users);
  console.log('userName: ', userName);


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

      {popup !== undefined && popup && (
        <Popup onClick={() => showPopup(!popup)}>
          <div className={styles.popup}>
            <div className={styles.column}>
              <div className={styles.columnTitle}>Members</div>
              {users && users.length > 0 &&
                users.map(item => (
                  <Fragment>
                    {console.log('item.accountName: ', getUserName(item))}
                    <UserCardLine
                      url={urls.getUserUrl(item.id)}
                      userPickSrc={getFileUrl(item.avatarFilename)}
                      userName={getUserName(item)}
                      accountName={item.accountName}
                      rate={item.currentRate}
                      sign="@"
                      userId={item.id}
                    />
                  </Fragment>
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
//   userPickSrc: PropTypes.string,
//   userPickAlt: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   rate: PropTypes.number.isRequired,
//   url: PropTypes.string,
//   isOwner: PropTypes.bool
