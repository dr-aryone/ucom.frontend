import React, { Fragment, useState } from 'react';
import moment from 'moment';
import Avatar from '../../Avatar';
import {
  WalletCommentIcon, WalletVoteIcon, WalletNetIcon, WalletCPUIcon, WalletEmissionIcon, WalletCPUNETIcon, WalletFromIcon,
  WalletToIcon, WalletSnowflakeIcon, WalletDropIcon, WalletRAMIcon,
} from '../../Icons/WalletIcons';
import WalletActivityPopup from './Popup';
import ModalContent from '../../ModalContent';
import Popup from '../../Popup';
import urls from '../../../utils/urls';

// TODO: Less to css modules
// TODO: PropTypes

const round = amount => Math.round(amount * 100) / 100;

const types = {
  TR_TYPE__TRANSFER_FROM: 10,
  TR_TYPE__TRANSFER_TO: 11,
  TR_TYPE_STAKE_RESOURCES: 20,
  TR_TYPE_UNSTAKING_REQUEST: 30,
  TR_TYPE_VOTE_FOR_BP: 40,
  TR_TYPE_CLAIM_EMISSION: 50,
  TR_TYPE_BUY_RAM: 60,
  TR_TYPE_SELL_RAM: 61,
};

const getAvatar = (props) => {
  let cpu;
  let net;

  switch (props.trType) {
    case types.TR_TYPE__TRANSFER_FROM:
      if (!props.user) return null;
      return <Avatar src={urls.getFileUrl(props.user.avatarFilename)} icon={<WalletFromIcon />} />;

    case types.TR_TYPE__TRANSFER_TO:
      if (!props.user) return null;
      return <Avatar src={urls.getFileUrl(props.user.avatarFilename)} icon={<WalletToIcon />} />;

    case types.TR_TYPE_BUY_RAM:
      return <Avatar srcComponent={<WalletRAMIcon />} icon={<WalletFromIcon />} />;

    case types.TR_TYPE_SELL_RAM:
      return <Avatar srcComponent={<WalletRAMIcon />} icon={<WalletToIcon />} />;

    case types.TR_TYPE_VOTE_FOR_BP:
      return <Avatar srcComponent={<WalletVoteIcon />} />;

    case types.TR_TYPE_STAKE_RESOURCES:
      net = props.resources.net.tokens.selfDelegated;
      cpu = props.resources.cpu.tokens.selfDelegated;
      if (cpu && net) {
        return <Avatar srcComponent={<WalletCPUNETIcon />} icon={<WalletSnowflakeIcon />} />;
      } else if (cpu) {
        return <Avatar srcComponent={<WalletCPUIcon />} icon={<WalletSnowflakeIcon />} />;
      }
      return <Avatar srcComponent={<WalletNetIcon />} icon={<WalletSnowflakeIcon />} />;

    case types.TR_TYPE_UNSTAKING_REQUEST:
      net = props.resources.net.unstakingRequest.amount;
      cpu = props.resources.cpu.unstakingRequest.amount;
      if (cpu && net) {
        return <Avatar srcComponent={<WalletCPUNETIcon />} icon={<WalletDropIcon />} />;
      } else if (cpu) {
        return <Avatar srcComponent={<WalletCPUIcon />} icon={<WalletDropIcon />} />;
      }
      return <Avatar srcComponent={<WalletNetIcon />} icon={<WalletDropIcon />} />;

    case types.TR_TYPE_CLAIM_EMISSION:
      return <Avatar srcComponent={<WalletEmissionIcon />} icon={<WalletToIcon />} />;

    default:
      return null;
  }
};

const getTrType = (props) => {
  switch (props.trType) {
    case types.TR_TYPE__TRANSFER_FROM:
    case types.TR_TYPE__TRANSFER_TO:
      return 'Transfer';
    case types.TR_TYPE_VOTE_FOR_BP:
      return 'Vote';
    case types.TR_TYPE_STAKE_RESOURCES:
      return 'Stake';
    case types.TR_TYPE_UNSTAKING_REQUEST:
      return 'Unstake';
    case types.TR_TYPE_CLAIM_EMISSION:
      return 'Withdraw';
    case types.TR_TYPE_SELL_RAM:
      return 'Sell RAM';
    case types.TR_TYPE_BUY_RAM:
      return 'Buy RAM';
    default:
      return null;
  }
};

const getAmount = (props) => {
  let cpu;
  let net;
  switch (props.trType) {
    case types.TR_TYPE__TRANSFER_TO:
      return `${round(props.tokens.active)} ${props.tokens.currency}`;

    case types.TR_TYPE__TRANSFER_FROM:
      return `-${round(props.tokens.active)} ${props.tokens.currency}`;

    case types.TR_TYPE_SELL_RAM:
      return `${round(props.resources.ram.tokens.amount)} ${props.resources.ram.tokens.currency}`;

    case types.TR_TYPE_BUY_RAM:
      return `-${round(props.resources.ram.tokens.amount)} ${props.resources.ram.tokens.currency}`;

    case types.TR_TYPE_STAKE_RESOURCES:
      net = round(props.resources.net.tokens.selfDelegated);
      cpu = round(props.resources.cpu.tokens.selfDelegated);
      return `-${cpu && net ? cpu + net : cpu || net} ${props.resources.net.tokens.currency}`;

    case types.TR_TYPE_UNSTAKING_REQUEST:
      net = round(props.resources.net.unstakingRequest.amount);
      cpu = round(props.resources.cpu.unstakingRequest.amount);
      return `${cpu && net ? cpu + net : cpu || net} ${props.resources.net.unstakingRequest.currency}`;

    case types.TR_TYPE_CLAIM_EMISSION:
      return `${round(props.tokens.emission)} ${props.tokens.currency}`;

    default:
      return null;
  }
};

const getActionText = (props) => {
  let cpu;
  let net;
  let actionText;
  switch (props.trType) {
    case types.TR_TYPE__TRANSFER_TO:
      return <div><strong>{props.user.accountName} </strong>sent you tokens</div>;

    case types.TR_TYPE__TRANSFER_FROM:
      return <div>You sent <strong>{props.user.accountName}</strong> tokens</div>;

    case types.TR_TYPE_SELL_RAM:
      return <div>Sold {round(props.resources.ram.amount)}{props.resources.ram.dimension} <strong>RAM</strong></div>;

    case types.TR_TYPE_BUY_RAM:
      return <div>Bought {round(props.resources.ram.amount)}{props.resources.ram.dimension} <strong>RAM</strong></div>;

    case types.TR_TYPE_STAKE_RESOURCES:
      net = props.resources.net.tokens.selfDelegated;
      cpu = props.resources.cpu.tokens.selfDelegated;
      if (cpu && net) {
        actionText = 'Staked UOS for Network BW and CPU Time';
      } else if (cpu) {
        actionText = 'Staked UOS for CPU Time';
      } else {
        actionText = 'Staked UOS for Network BW';
      }
      return actionText;

    case types.TR_TYPE_UNSTAKING_REQUEST:
      net = props.resources.net.unstakingRequest.amount;
      cpu = props.resources.cpu.unstakingRequest.amount;
      if (cpu && net) {
        actionText = 'Unstaking UOS for Network BW and CPU Time';
      } else if (cpu) {
        actionText = 'Unstaking UOS for CPU Time';
      } else {
        actionText = 'Unstaking UOS for Network BW';
      }
      return actionText;

    case types.TR_TYPE_CLAIM_EMISSION:
      return <div>Got UOS  <strong>Emission</strong></div>;

    case types.TR_TYPE_VOTE_FOR_BP:
      if (!props.producers.length) {
        return <div>Not voted for anyone</div>;
      }
      return (
        <div>Voted for {props.producers.map((i, index) =>
          <span key={index}><strong>{i}</strong>{props.producers.length === index - 1 ? '' : ','} </span>)}
        </div>
      );
    default:
      return null;
  }
};

const WalletActivityItem = (props) => {
  if (Object.values(types).every(e => e !== props.trType)) {
    console.error(`Unknown type of transaction ${props.trType}`);
    return null;
  }

  const [visibility, setVisibility] = useState(false);
  const show = () => setVisibility(true);
  const hide = () => setVisibility(false);

  const action = getActionText(props);
  const walletAvatar = getAvatar(props);
  const trType = getTrType(props);
  const amount = getAmount(props);

  return (
    <Fragment>
      <div className="wallet-activity__item" onClick={show} role="presentation">
        <div className="wallet-activity__main">
          <div className="wallet-activity__avatar">
            {walletAvatar}
          </div>
          <div>
            <div className="wallet-activity__group">
              <div className="wallet-activity__time">{moment(props.updatedAt).format('HH:mm:ss')}</div>
              <div className="wallet-activity__type">{trType}</div>
            </div>
            <div className="wallet-activity__action">
              {action}
            </div>
          </div>

        </div>
        <div className="wallet-activity__amount"><strong>{amount}</strong></div>

        <div className="wallet-activity__side">
          {props.memo &&
          <Fragment>
            <div>
              <WalletCommentIcon />
            </div>
            <div className="wallet-activity__comment">{props.memo}</div>
          </Fragment>}
        </div>
      </div>
      {visibility && (
        <Popup onClickClose={hide}>
          <ModalContent onClickClose={hide} mod="wallet-activity-popup" >
            <WalletActivityPopup {...{
              ...props, action, trType, amount, walletAvatar,
              }}
            />
          </ModalContent>
        </Popup>
      )}
    </Fragment>
  );
};

export default WalletActivityItem;
