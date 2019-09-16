import Vue from "vue";
import Router from "vue-router";
// import Agreement from "./views/Agreement.vue";

Vue.use(Router);
const requireAuth = () => (to, from, next) => {
  let accessToken = localStorage.getItem("accessToken");
  console.log("requireAuth : accessToken", accessToken);
  if (accessToken == null) {
    alert("로그인 후 사용가능 합니다.");
    next("/login");
  } else {
    next();
  }
};

export default new Router({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/register",
      name: "register",
      beforeEnter: requireAuth(),
      component: () => import("./views/register/Register.vue")
    },
    {
      path: "/allExam",
      name: "allExam",
      beforeEnter: requireAuth(),
      component: () => import("./views/AllExam.vue")
    },
    {
      path: "/editExam/:id",
      name: "editExam",
      component: () => import("./views/register/EditExam.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/losspwd",
      name: "losspwd",
      component: () => import("./views/LossPwd.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUp.vue")
    },
    {
      path: "/library",
      name: "library",
      component: () => import("./views/library/Library.vue")
    },
    {
      path: "/library/edit/:id",
      name: "editLibrary",
      component: () => import("./views/library/EditLibrary.vue")
    },
    {
      path: "/registerImage",
      name: "registerImage",
      beforeEnter: requireAuth(),
      component: () => import("./views/library/RegisterImage.vue")
    },
    {
      path: "/dragAndDrop",
      name: "dragAndDrop",
      component: () => import("./views/DragAndDropUpload.vue")
    },
    {
      path: "/dropzone",
      name: "dropzone",
      component: () => import("./views/Dropzone.vue")
    },
    {
      path: "/profile",
      name: "profile",
      beforeEnter: requireAuth(),
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/exam/detail/:id",
      name: "detail",
      beforeEnter: requireAuth(),
      component: () => import("./views/ExamDetail.vue")
    },
    {
      path: "/exam/examResult/:id",
      name: "examResult",
      beforeEnter: requireAuth(),
      component: () => import("./views/ExamResult.vue")
    },
    {
      path: "/questionRegister/:publicUID",
      name: "questionRegister",
      component: () => import("./views/questionRegister.vue")
    },
    {
      path: "/admin/dashboard",
      name: "admin",
      component: () => import("./views/admin/Dashboard.vue")
    },
    {
      path: "/admin/dashboard/userManage",
      name: "userManage",
      component: () => import("./views/admin/UserManage.vue")
    },
    {
      path: "admin/dashboard/userManage/userProfile",
      name: "userProfile",
      component: () => import("./views/admin/UserProfile.vue")
    },
    {
      path: "/admin/dashboard/questionManage",
      name: "questionManage",
      component: () => import("./views/admin/QuestionManage.vue")
    },
    {
      path: "/admin/dashboard/libraryManage",
      name: "libraryManage",
      component: () => import("./views/admin/LibraryManage.vue")
    }
  ]
});
