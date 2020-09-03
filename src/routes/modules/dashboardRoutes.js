import Dashboard from '@/components/layout/Dashboard.vue';
import Index from '@/components/pages/Dashboard/Index.vue';
import Category from '@/components/pages/Dashboard/Category.vue';

export default [
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
              path: '',
              name: 'index',
              component: Index,
            },
            {
              path: 'category',
              name: 'category',
              component: Category,
            },
          ]
    },
];
