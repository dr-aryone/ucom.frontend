import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import React from 'react';
import Checkbox from '../Checkbox';
import Avatar from '../Avatar';
import { IconOK } from '../Icons/GovernanceIcons';
import { getBpStatusById, BP_STATUS_ACTIVE_ID, LIMITER_OF_PRODUCERS } from '../../utils/nodes';
import { selectUser } from '../../store/selectors/user';
import { governanceNodesSetVote } from '../../actions/governance';
import urls from '../../utils/urls';
import { normalizeAmount } from '../../utils/governance';

const GovernanceTable = props => (
  <table className="governance-table">
    {!props.withoutTable &&
      <thead className="governance-table__head">
        <tr className="governance-table__row">
          {((props.user.id && props.data.some(i => i.isVoted) && props.isPreview) || (!props.isPreview)) &&
            <td className="governance-table__cell governance-table__cell_id" />
          }
          <td className="governance-table__cell governance-table__cell_name">
            <span className="inline inline_small">
              <span className="inline__item">Organization</span>
            </span>
          </td>
          <td
            className={classNames({
              'governance-table__cell': true,
              'governance-table__cell_votes': true,
              'only-phone': props.phoneMod,
            })}
            data-name="Votes"
          >Votes
          </td>
          <td className="governance-table__cell governance-table__cell_amount only-pad">Vote Amount</td>
          <td className="governance-table__cell governance-table__cell_state">State</td>
        </tr>
      </thead>
    }
    <tbody className={classNames({
      'governance-table__body': true,
      'governance-table__body_auto-width': !props.withoutTable,
    })}
    >
      {props.data.map(item => (
        <tr className="governance-table__row" key={item.id}>
          {(() => {
            if (props.user.id && props.isPreview && item.isVoted) {
              return (
                <td className="governance-table__cell governance-table__cell_avatar" data-name="">
                  <Avatar src={urls.getFileUrl(props.user.avatarFilename)} size="xysmall" icon={<IconOK />} />
                </td>
              );
            } else if (props.user.id && !props.isPreview) {
              return (
                <td className="governance-table__cell governance-table__cell_id" data-name="">
                  <div className="governance-table-checkbox">
                    <div className="governance-table-checkbox__input">
                      <Checkbox
                        isChecked={item.isVoted}
                        isDisabled={!item.isVoted && props.data.filter(i => i.isVoted).length >= LIMITER_OF_PRODUCERS}
                        onChange={() => {
                          props.governanceNodesSetVote({ id: item.id, vote: !item.isVoted, nodeType: item.blockchainNodesType });
                        }}
                      />
                    </div>
                    <div className="governance-table-checkbox__label" />
                  </div>
                </td>
              );
            } else if ((props.user.id && props.isPreview && props.data.some(i => i.isVoted)) || (!props.isPreview)) {
              return (
                <td className="governance-table__cell governance-table__cell_id" data-name="" />
              );
            }
              return null;
          })()}

          <td className="governance-table__cell governance-table__cell_name" data-name="Organization">{item.title}</td>
          <td
            className={classNames({
              'governance-table__cell': true,
              'governance-table__cell_votes': true,
              'only-phone': props.phoneMod,
            })}
            data-name="Votes"
          >
            <div className="governance-table__votes-block">{item.votesCount} <div className="governance-table__percentage">{item.votesPercentage}%</div></div>
          </td>
          <td className="governance-table__cell governance-table__cell_amount only-pad" data-name="Vote Amount">{Math.ceil(normalizeAmount(item.scaledImportanceAmount)).toLocaleString('ru')}</td>
          <td className="governance-table__cell governance-table__cell_state" data-name="State">
            <span
              className={classNames(
                'badge',
                { 'badge_green': item.bpStatus === BP_STATUS_ACTIVE_ID },
              )}
            >
              {getBpStatusById(item.bpStatus)}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default connect(
  state => ({
    user: selectUser(state),
  }),
  dispatch => bindActionCreators({
    governanceNodesSetVote,
  }, dispatch),
)(GovernanceTable);
