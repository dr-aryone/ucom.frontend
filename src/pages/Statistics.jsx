import React from 'react';
// import Footer from '../components/Footer';
import LayoutBase from '../components/Layout/LayoutBase';


const statisticRows = [
  { title: 'Members', field: 'members' },
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

const Statistics = (props) => {
  console.log(props);
  return (
    <LayoutBase>
      <div className="content">

        <div className="content__inner content__inner_medium">
          <div className="content__title content__title_between">
            <h1 className="title">Statistics</h1>
          </div>
        </div>
        <div className="content">
          <div className="content__inner">
            <div className="table-content__table">
              <table className="list-table list-table_events list-table_responsive">
                <thead className="list-table__head">
                  <tr className="list-table__row">
                    {['', 'Total', '24hr'].map((item, index) => (
                      <td
                        key={index}
                        role="presentation"
                        className=""
                      >
                        <div className="list-table__title">
                          {item}
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody className="list-table__body">
                  {statisticRows.map((item, index) => (
                    <tr className="list-table__row" key={index}>
                      <td className="">{item.title}</td>
                      <td className="">100</td>
                      <td className="">100</td>
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
