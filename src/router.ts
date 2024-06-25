import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import Editor from '@/views/EditorView.vue'
import Preview from '@/views/PreviewView.vue'
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
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview,
      props: true
    }
  ]
})
