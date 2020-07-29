import { combineReducers } from "redux";
import adminAuthCredentials from "./adminAtuhCredentials";
import allAdmins from "./allAdminsReducer";
import allAdminUsers from "./allAdminUsers";
import allMainUsers from "./allMainUsers";
import routersReducer from "./routerReducers";
const rootReducer = combineReducers({
  adminAuth: adminAuthCredentials,
  routes: routersReducer,
  adminUsers: allAdminUsers,
  allAdmins: allAdmins,
  allMainUsers: allMainUsers,
});
export default rootReducer;
