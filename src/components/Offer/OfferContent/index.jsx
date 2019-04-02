import React, { Fragment, useEffect } from 'react';
import styles from './styles.css';


const OfferContent = (props) => {
  // useEffect(() => {
  //   props.commentsResetContainerDataByEntryId({
  //     entryId: props.postId,
  //     containerId: COMMENTS_CONTAINER_ID_POST,
  //   });
  // }, [postId]);

  const tokens = [
    {
      amount_claim: 123456789,
      amount_left: 121234561,
      symbol: 'UOS',
    },
    {
      amount_claim: 123456789,
      amount_left: 71289,
      symbol: 'UOS.F',
    },
  ];

  console.log('props.offerData: ', props.offerData);

  const { offerData } = props.offerData;

  const perc1 = Number(getPercent(offerData.tokens[0].amount_left, offerData.tokens[0].amount_claim));
  const perc2 = Number(getPercent(offerData.tokens[1].amount_left, offerData.tokens[1].amount_claim));

  return (
    <Fragment>

    </Fragment>
  );
};

export default OfferContent;
