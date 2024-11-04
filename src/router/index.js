import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Chapter1 from '../views/Chapter1.vue';
import Chapter2 from '../views/Chapter2.vue';
import Chapter3 from '../views/Chapter3.vue';
import Chapter4 from '../views/Chapter4.vue';
import Chapter5 from '../views/Chapter5.vue';
import Advice from '../views/Advice.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/chapter1', component: Chapter1 },
  { path: '/chapter2', component: Chapter2 },
  { path: '/chapter3', component: Chapter3 },
  { path: '/chapter4', component: Chapter4 },
  { path: '/chapter5', component: Chapter5 },
  { path: '/advice', component: Advice },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
