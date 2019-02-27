import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../Popup';
import ModalContent from '../ModalContent';
import Rate from '../Rate';

const TagList = ({ myTags, limit, loadMore }) => {
  if (!myTags || !myTags.length) {
    return null;
  }

  const [popupVisible, setPopupVisible] = useState(false);
  const visibleTags = myTags.slice(0, limit);
  const TagCard = ({ item }) => (
    <div className="organization-list__item user-card-simple">
      <div className="user-card-simple_tag">
        <div className="user-card-simple__name">
          <Link to={`/tags/${item.title}`}>#{item.title}</Link>
        </div>
        <div className="user-card-simple__rate">
          {item.currentRate}°
        </div>
      </div>
    </div>
  );
  return (
    <div className="organization-list">
      <div className="organization-list__list">
        {visibleTags.map((item, id) => (
          <TagCard item={item} key={id} />
        ))}
      </div>

      {myTags.length > limit &&
      <div className="organization-list__more">
        <button
          className="button-clean button-clean_link"
          onClick={() => { setPopupVisible(true); loadMore(); }}
        >
           View All
        </button>
      </div>
      }
      {popupVisible && myTags &&
        <Popup onClickClose={() => setPopupVisible(false)}>
          <ModalContent onClickClose={() => setPopupVisible(false)}>
            <div className="entry-list entry-list_simple">
              <div className="entry-list__title">Tags</div>
              <div className="entry-list__list">
                {myTags.map((item, id) => (
                  <div className="entry-list__item" key={id}>
                    <div className="organization-list__item user-card-simple entry-list__card">
                      <div className="user-card-simple_tag">
                        <div className="user-card-simple__name">
                          <Link to={`/tags/${item.title}`}>#{item.title}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="entry-list__rate">
                      <Rate value={+item.currentRate} className="rate_small" />
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </ModalContent>
        </Popup>
      }
    </div>
  );
};

export default TagList;
