import { createRouter, createWebHistory } from 'vue-router';

const pageModules = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default',
});

const componentModules = import.meta.glob('../views/**/index.vue');

const routes = Object.entries(pageModules).map(([pagePath, config]) => {
  const path = pagePath.replace('../views', '').replace('/page.js', '') || '/';
  const componentPath = pagePath.replace('/page.js', 'index.vue');
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  return {
    path: path,
    name: name,
    component: componentModules[componentPath],
    meta: config,
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
