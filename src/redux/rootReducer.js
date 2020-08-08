import { combineReducers } from "redux";
import adminAuthCredentials from "./adminAtuhCredentials";
import allAdmins from "./allAdminsReducer";
import allAdminUsers from "./allAdminUsers";
import allMainUsers from "./allMainUsers";
import allPermissionsReducers from "./permissionsReducer";
import rolesReducers from "./rolesReducers";
import routersReducer from "./routerReducers";
const rootReducer = combineReducers({
  adminAuth: adminAuthCredentials,
  routes: routersReducer,
  adminUsers: allAdminUsers,
  allAdmins: allAdmins,
  allMainUsers: allMainUsers,
  totalRoles: rolesReducers,
  allPermissions: allPermissionsReducers,
});
export default rootReducer;
