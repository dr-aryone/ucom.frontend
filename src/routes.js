import HomePage, { getHomePageData } from './pages/Home';
import UserPage, { getUserPageData } from './pages/User';
import EditPostPage from './pages/EditPost';
import ProfilePage from './pages/Profile';
import PostPage, { getPostPageData } from './pages/Post';
import OverviewPage, { getPageData } from './pages/Overview';
import Offer, { getPostOfferData } from './pages/Offer';
import UsersPage from './pages/Users';
import AboutPage from './pages/About';
import OrganizationsPage from './pages/Organizations';
import OrganizationsCreatePage from './pages/OrganizationsCreate';
import OrganizationPage from './pages/Organization';
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './components/Registration/Registration';
import GovernancePage from './components/Governance/Governance';
import Tag from './pages/Tag';
import Faq from './pages/Faq';
import Statistics from './pages/Statistics';
import { getAirdropOfferId } from './utils/airdrop';

const airdropOfferId = getAirdropOfferId();

export default [{
  path: '/',
  component: HomePage,
  getData: getHomePageData,
}, {
  path: '/overview/:route/filter/:filter',
  component: OverviewPage,
  getData: getPageData,
}, {
  path: '/overview/:route/filter/:filter/page/:page',
  component: OverviewPage,
  getData: getPageData,
}, {
  path: '/user/:userId',
  component: UserPage,
  getData: getUserPageData,
}, {
  path: '/user/:userId/:postId',
  component: UserPage,
  getData: getUserPageData,
}, {
  path: '/posts/new',
  component: EditPostPage,
}, {
  path: '/posts/:id/edit',
  component: EditPostPage,
}, {
  path: `/posts/${airdropOfferId}`,
  component: Offer,
  getData: getPostOfferData,
}, {
  path: '/posts/:postId',
  component: PostPage,
  getData: getPostPageData,
}, {
  path: '/registration',
  component: RegistrationPage,
}, {
  path: '/profile',
  component: ProfilePage,
}, {
  path: '/users',
  component: UsersPage,
}, {
  path: '/about',
  component: AboutPage,
}, {
  path: '/about/:page',
  component: AboutPage,
}, {
  path: '/communities',
  component: OrganizationsPage,
}, {
  path: '/communities/new',
  component: OrganizationsCreatePage,
}, {
  path: '/communities/:id',
  component: OrganizationPage,
}, {
  path: '/communities/:id/edit',
  component: OrganizationsCreatePage,
}, {
  path: '/communities/:id/:postId',
  component: OrganizationPage,
}, {
  path: '/communities/:organizationId/discussions/new',
  component: EditPostPage,
}, {
  path: '/governance',
  component: GovernancePage,
}, {
  path: '/tags/:title',
  component: Tag,
},
{
  path: '/faq',
  component: Faq,
},
{
  path: '/stats',
  component: Statistics,
},
{
  path: '*',
  component: NotFoundPage,
}];
