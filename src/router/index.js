import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
const Cart = () => import(/* webpackChunkName: "about" */ '../views/Cart/Cart.vue');
const Categories = () => import(/* webpackChunkName: "about" */ '../views/Categories/Categories.vue');
const Home = () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue');
const User = () => import(/* webpackChunkName: "about" */ '../views/User/User.vue');
const Details = () => import(/* webpackChunkName: "about" */ '../views/Details/Details.vue');
const Register = () => import(/* webpackChunkName: "about" */ '../views/User/UserRegister.vue');
const SignIn = () => import(/* webpackChunkName: "about" */ '../views/User/UserSignIn.vue');
const Collect = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/UserCollect.vue');
const Order = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/UserOrder.vue');
const Account = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/UserAccount.vue');
const Address = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/UserAddress.vue');
const About = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/AboutUs.vue');
const AddAddress = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/AddAddress.vue');
const OrderList = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/OrderList.vue');
const OrderDetail = ()=>import(/* webpackChunkName: "about" */ '../views/User/childrencommon/OrderDetail.vue');



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
    meta:{
      requiresAuth:true,
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: AddAddress,
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: OrderList,
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: OrderDetail,
  },
  /*{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/AboutView.vue')
  }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from,next) => {
  if(to.meta.requiresAuth && !store.state.token){
    next({name:'signIn'});
  }else {
    next();
  }
})

export default router
