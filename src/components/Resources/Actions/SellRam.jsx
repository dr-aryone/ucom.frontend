import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Popup, { Content } from '../../Popup';
import TradeRamForm from './TradeRamForm';
import { walletToggleSellRam } from '../../../actions/walletSimple';

const BuyRam = (props) => {
  if (!props.wallet.sellRamVisible) {
    return null;
  }

  return (
    <Popup onClickClose={() => props.dispatch(walletToggleSellRam(false))}>
      <Content
        walletAction
        noRoundBorders
        onClickClose={() => props.dispatch(walletToggleSellRam(false))}
      >
        <TradeRamForm
          sell
          onSubmit={() => props.dispatch(walletToggleSellRam(false))}
        />
      </Content>
    </Popup>
  );
};

BuyRam.propTypes = {
  owner: PropTypes.shape({
    accountName: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    sellRamVisible: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(state => ({
  owner: state.user.data,
  wallet: state.walletSimple,
}))(BuyRam);
