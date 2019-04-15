import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Popup, { Content } from '../../Popup';
import TradeRamForm from './TradeRamForm';
import { walletToggleBuyRam } from '../../../actions/walletSimple';

const BuyRam = (props) => {
  if (!props.wallet.buyRamVisible) {
    return null;
  }

  return (
    <Popup onClickClose={() => props.dispatch(walletToggleBuyRam(false))}>
      <Content
        walletAction
        roundBorders={false}
        onClickClose={() => props.dispatch(walletToggleBuyRam(false))}
      >
        <TradeRamForm
          onSubmit={() => props.dispatch(walletToggleBuyRam(false))}
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
    buyRamVisible: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(state => ({
  owner: state.user.data,
  wallet: state.walletSimple,
}))(BuyRam);
