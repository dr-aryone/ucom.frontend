import { connect } from 'react-redux';
import Form from './index';
import urls from '../../../utils/urls';
import { getUserName } from '../../../utils/user';

export default connect(
  state => ({
    ownerPickUrl: urls.getUserUrl(state.user.data.id),
    ownerPickAlt: getUserName(state.user.data),
    ownerPickSrc: urls.getFileUrl(state.user.data.avatarFilename),
  }),
  null,
)(Form);
