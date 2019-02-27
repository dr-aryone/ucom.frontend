import React, { PureComponent } from 'react';
import classNames from 'classnames';
import UserCard from '../components/UserCard';
import api from '../api';
import { getOrganizationUrl } from '../utils/organization';
import IconTableTriangle from '../components/Icons/TableTriangle';
import { getFileUrl } from '../utils/upload';
import LayoutBase from '../components/Layout/LayoutBase';
import loader from '../utils/loader';

class EventsPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      hasMore: true,
      sortBy: '-current_rate',
      organizations: [],
    };
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const params = {
      page: this.state.page + 1,
      sort_by: this.state.sortBy,
      per_page: 20,
    };

    loader.start();

    try {
      const data = await api.getOrganizations(params);
      this.setState(prevState => ({
        organizations: [...prevState.organizations, ...data.data],
        hasMore: data.metadata.hasMore,
        page: params.page,
      }));
    } catch (e) {
      console.error(e);
    }

    loader.done();
  }

  changeSort = async (sortBy) => {
    const params = {
      page: 1,
      sort_by: sortBy,
    };

    loader.start();

    try {
      const data = await api.getOrganizations(params);
      this.setState({
        organizations: data.data,
        hasMore: data.metadata.hasMore,
        sortBy,
        page: 1,
      });
    } catch (e) {
      console.error(e);
    }

    loader.done();
  }

  render() {
    return (
      <LayoutBase>
        <div className="layout layout_entries">
          <div className="layout__title">
            <h1 className="title">Communities</h1>
          </div>
          <div className="layout__table">
            {this.state.organizations && this.state.organizations.length > 0 &&
              <div className="table-content">
                <div className="table-content__table">
                  <table className="list-table list-table_indexed list-table_organizations list-table_responsive">
                    <thead className="list-table__head">
                      <tr className="list-table__row">
                        <td className="list-table__cell list-table__cell_index">#</td>
                        {[{
                          title: 'Name',
                          name: 'title',
                          sortable: true,
                        }, {
                          title: 'Rate',
                          name: 'current_rate',
                          sortable: true,
                        }].map(item => (
                          <td
                            key={item.name}
                            role="presentation"
                            className={classNames(
                              'list-table__cell',
                              { 'list-table__cell_sortable': item.sortable },
                            )}
                            onClick={() => this.changeSort(`${this.state.sortBy === `-${item.name}` ? '' : '-'}${item.name}`)}
                          >
                            <div className="list-table__title">
                              {item.title}

                              {this.state.sortBy === `-${item.name}` && (
                                <div className="list-table__sort-icon">
                                  <IconTableTriangle />
                                </div>
                              )}

                              {this.state.sortBy === `${item.name}` && (
                                <div className="list-table__sort-icon list-table__sort-icon_flip">
                                  <IconTableTriangle />
                                </div>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="list-table__body">
                      {this.state.organizations.map((item, index) => (
                        <tr className="list-table__row" key={item.id}>
                          <td className="list-table__cell list-table__cell_index">{index + 1}</td>
                          <td className="list-table__cell list-table__cell_name" data-title="Name">
                            <UserCard
                              profileLink={getOrganizationUrl(item.id)}
                              avatarUrl={getFileUrl(item.avatarFilename)}
                              userName={item.title}
                              accountName={item.nickname}
                              sign="@"
                            />
                          </td>
                          <td className="list-table__cell" data-title="Rate">
                            <span className="title title_xsmall title_light">{(+item.currentRate).toLocaleString()}°</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {this.state.hasMore && (
                  <div className="table-content__showmore">
                    <button
                      className="button-clean button-clean_link"
                      onClick={() => this.loadMore()}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </LayoutBase>
    );
  }
}

export default EventsPage;
