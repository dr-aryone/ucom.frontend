import { connect } from 'react-redux';
import React, { PureComponent, Fragment } from 'react';
import { getOrganizationById } from '../../store/organizations';
import { getFileUrl } from '../../utils/upload';
import OrganizationCard from './OrganizationCard';
import { getOrganizationUrl } from '../../utils/organization';
import OrganizationListPopup from './OrganizationListPopup';
import OrganizationListPopupMore from './OrganizationListPopupMore';

class OrganizationList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      popupVisible: false,
    };
  }

  render() {
    if (!this.props.organizationsIds || !this.props.organizationsIds.length) {
      return null;
    }

    const visibleOrganizations = this.props.organizationsIds
      .sort()
      .slice(0, this.props.limit)
      .map(id => getOrganizationById(this.props.organizations, id))
      .filter(item => item && item.id);

    return (
      <Fragment>
        <div className="organization-list">
          <div className="organization-list__list">
            {visibleOrganizations.map(item => (
              <div className="organization-list__item" key={item.id}>
                <OrganizationCard
                  avatarSrc={getFileUrl(item.avatarFilename)}
                  title={item.title}
                  nickname={item.nickname}
                  currentRate={item.currentRate}
                  url={getOrganizationUrl(item.id)}
                />
              </div>
            ))}
          </div>

          {this.props.organizationsIds.length > this.props.limit &&
            <div className="organization-list__more">
              <button
                className="button-clean button-clean_link"
                onClick={() => { this.setState({ popupVisible: true }); if (this.props.loadMore) this.props.loadMore(); }}
              >
                View All
              </button>
            </div>
          }
        </div>

        {this.state.popupVisible && (
          this.props.tagTitle ? (
            <OrganizationListPopupMore
              organizationsIds={this.props.organizationsIds}
              tagTitle={this.props.tagTitle}
              onClickClose={() => this.setState({ popupVisible: false })}
            />
          ) : (
            <OrganizationListPopup
              organizationsIds={this.props.organizationsIds}
              onClickClose={() => this.setState({ popupVisible: false })}
            />
          )
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({
  organizations: state.organizations,
}))(OrganizationList);
