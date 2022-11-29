import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FindView from '../views/FindView.vue';
import SerializeView from '../views/SerializeView.vue';
import UserView from '../views/UserView.vue';
import UsersView from '../views/UsersView.vue';


import CardView from '../views/CardView.vue';
import SearchView from '../views/SearchView.vue';
import FindProCardView from '../views/FindProCardView.vue';
import PicTextView from '../views/PicTextView.vue';
import SerializeCardView from '../views/SerializeCardView.vue';
import SearchTitleView from '../views/SearchTitleView.vue';
import HotView from '../views/HotView.vue';
import AnswersView from '../views/AnswersView.vue';
import DateView from '../views/DateView.vue';
import FictionView from '../views/FictionView.vue';
import WriterView from '../views/WriterView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/find',
    name: 'find',
    component: FindView
  },
  {
    path: '/serialize',
    name: 'serialize',
    component: SerializeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/card',
    name: 'card',
    component: CardView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/findca',
    name: 'findca',
    component: FindProCardView
  },
  {
    path: '/pictext',
    name: 'pictext',
    component: PicTextView
  },
  {
    path: '/sercard',
    name: 'sercard',
    component: SerializeCardView
  },
  {
    path: '/searchtitle',
    name: 'searchtitle',
    component: SearchTitleView
  },
  {
    path: '/hot',
    name: 'hot',
    component: HotView
  },
  {
    path: '/answers',
    name: 'answers',
    component: AnswersView
  },
  {
    path: '/datecard',
    name: 'datecard',
    component: DateView
  },
  {
    path: '/fiction',
    name: 'fiction',
    component: FictionView
  },
  {
    path: '/writer',
    name: 'writer',
    component: WriterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
];

const router = new VueRouter({
  routes
});

// router.beforeEach(function (to, from) {
//   from;
//   let token = localStorage.getItem("token");
//   if (to.meta.needLogin && !token) {
//     console.log("需要登陆");
//     router.push("/login?from=" + to.fullPath);
//   }
// });
export default router;
