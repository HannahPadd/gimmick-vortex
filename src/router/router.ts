import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Editor from '@/views/EditorView.vue'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    }
  ]
})
