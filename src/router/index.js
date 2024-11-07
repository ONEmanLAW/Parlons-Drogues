import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Chapter1 from '../views/Chapter1.vue';
import Chapter2 from '../views/Chapter2.vue';
import Chapter3 from '../views/Chapter3.vue';
import Advice from '../views/Advice.vue';
import Intro from '../views/IntroPage.vue';

const routes = [
  { path: '/home', component: Home },
  { path: '/chapter1', component: Chapter1 },
  { path: '/chapter2', component: Chapter2 },
  { path: '/chapter3', component: Chapter3 },
  { path: '/advice', component: Advice },
  { path: '/', component: Intro }, 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
