import Dashboard from './components/Dashboard.vue';
import IndexAppointment from './pages/appointment/Index.vue';
import IndexUser from './pages/user/Index.vue';
import IndexSetting from './pages/setting/Index.vue';
import IndexProfile from './pages/profile/Index.vue';

export default [
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard,
    },
    {
        path: '/admin/appointments',
        name: 'admin.appointments',
        component: IndexAppointment,
    },
    {
        path: '/admin/users',
        name: 'admin.users',
        component: IndexUser,
    },
    {
        path: '/admin/settings',
        name: 'admin.settings',
        component: IndexSetting,
    },
    {
        path: '/admin/profile',
        name: 'admin.profile',
        component: IndexProfile,
    },
]