import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import Task from "../pages/Task";

Vue.use(VueRouter);

const routes = [
  {
    // path: '/',
    path: '/todo-testing', //path fo github.io
    component: Home,
  },
  {
    // path: '/:id',
    path: '/todo-testing/:id', //path fo github.io
    component: Task,
    name: 'task'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
