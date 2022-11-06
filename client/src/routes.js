
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ARRender from "views/examples/ARRender"
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/add-course",
    name: "Add Course",
    icon: "ni ni-fat-add",
    component: Icons,
    layout: "/admin",
  },

  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/AR",
    name: "AR Beta",
    icon: "world",
    component: ARRender,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Logout",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
