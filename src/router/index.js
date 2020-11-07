import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";
import Profile from "@/components/sections/Profile.vue";
import ProfileForm from "@/components/sections/ProfileForm.vue";
import Web3Message from "@/components/sections/Web3Message.vue";
import { markRaw } from "vue";

const routes = [
  {
    // mode: 'history',
    path: "/",
    name: "Root",
    component: Home,
    meta: {
      view: markRaw(Web3Message)
    }
  },
  {
    // mode: 'history',
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      view: markRaw(Web3Message)
    }
  },
  {
    // mode: 'history',
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      view: markRaw(Profile)
    }
  },
  {
    // mode: 'history',
    path: "/sign-up",
    name: "SignUp",
    component: Home,
    meta: {
      view: markRaw(ProfileForm)
    }
  },
  {
    // mode: 'history',
    path: "/profile/edit",
    name: "ProfileEdit",
    component: Dashboard,
    meta: {
      view: markRaw(ProfileForm)
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
