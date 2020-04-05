import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import Task from "../pages/Task";

Vue.use(VueRouter);

const routes = [
  {
    path: '/todo-testing',
    component: Home,
  },
  {
    path: '/todo-testing/:id',
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
