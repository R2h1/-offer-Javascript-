import { createRouter, createWebHistory } from 'vue-router';

// page.js 中即路由页面的配置，比如 export default { title: '关于', menuOrder: 4 }
const pageModules = import.meta.glob('../views/**/page.js', {
  eager: true,
  import: 'default'
});

const componentModules = import.meta.glob('../views/**/index.vue', {
  eager: true,
  import: 'default'
});

const routes = Object.entries(pageModules).map(([pagePath, config]) => {
  const path = pagePath.replace('../views', '').replace('/page.js', '') || '/';
  const componentPath = pagePath.replace('/page.js', 'index.vue');
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  return {
    path,
    name,
    component: componentModules[componentPath],
    meta: config
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 在 vite 中自动生成路由
export default router;
