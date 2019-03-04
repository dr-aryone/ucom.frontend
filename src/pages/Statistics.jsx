import React from 'react';
// import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';
import styles from './Statistics.css';

const { ParamTypes } = require('ucom.libs.common').Stats.Dictionary;

const statisticRows = [
  { title: 'Members', field: 'members', fields: [] },
  { title: 'Content', fields: [] },
  { title: 'Communities', field: '' },
  { title: 'Tags', field: 'Tags' },
  { title: 'Publications', field: '' },
  { title: 'Posts', field: '' },
  { title: 'Feedback', fields: [] },
  { title: 'Comments', field: '' },
  { title: 'Replies', field: '' },
  { title: 'Actions', fields: [] },
  { title: 'Upvotes', field: '' },
  { title: 'Downvotes', field: '' },
  { title: 'Shares', fields: [] },
  { title: 'Publications', field: '' },
  { title: 'Posts', field: '' },
];

const Statistics = () => {
  console.log(ParamTypes);
  return (
    <LayoutBase>
      <div className="content">
        <div className="content">
          <h1 className="title">U°Community Statistics</h1>
          <div className="content__inner">
            <div className={styles.table}>
              <table className={styles.list}>
                <thead className={styles.head}>
                  <tr>
                    {['', 'Total', '24hr'].map((item, index) => (
                      <td
                        key={index}
                        role="presentation"
                        className=""
                      >
                        <div className={styles.title}>
                          {item}
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className={styles.body}>
                  {statisticRows.map((item, index) => (
                    <tr className={item.fields ? styles.captionRow : styles.row} key={index}>
                      <td><div className={item.fields ? styles.title : styles.caption}>{item.title}</div></td>
                      <td><div className={styles.usualItem}>100</div></td>
                      <td><div className={styles.usualItem}>+100</div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="content">
          <div className="content__inner">
            <Footer />
          </div>
        </div> */}
      </div>
    </LayoutBase>
  );
};

export default Statistics;
