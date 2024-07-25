import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import ProjectList from '../components/ProjectList.vue';
import ProjectForm from '../components/ProjectForm.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard, children: [
    { path: 'projects', component: ProjectList },
    { path: 'projects/new', component: ProjectForm },
    { path: 'projects/:id/edit', component: ProjectForm }
  ]}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;