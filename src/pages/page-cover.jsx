import React, { Component } from "react";
import Home from "./admin-home/admin-home";
import { Switch, Route } from "react-router-dom";
import Artisans from "./artisans/users";
import UserDetails from "./artisans/userDetails";
import Admins from "./admins/admins";
import AdminDetails from "./admins/adminDetails";
import mainUsers from "./users/main-users";
import MainUsers from "./users/main-users";
import MainUserDetails from "./users/all-main-user-details";
import Roles from "./roles/roles";
import CreateNewAdmin from "./admins/create-new-admin";
import AdminUpdate from "./admins/updateAdmin";
import CreateRoles from "./roles/create-new-roles";
import RolesDetails from "./roles/roles-details";
import Permissions from "./permissions/permissions";
class PageCover extends Component {
  state = {};
  render() {
    return (
      <div className="pageCont">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/artisans/:userDetails" component={UserDetails}></Route>
          <Route path="/artisans" component={Artisans}></Route>
          <Route path="/admins/create" component={CreateNewAdmin}></Route>
          <Route path="/admins/update/:adminId" component={AdminUpdate}></Route>
          <Route path="/admins/:adminDetails" component={AdminDetails}></Route>

          <Route path="/admins" component={Admins}></Route>

          <Route path="/users/:userId" component={MainUserDetails}></Route>

          <Route path="/users" component={MainUsers}></Route>
          <Route path="/roles/create" component={CreateRoles}></Route>
          <Route path="/roles/:roleDetails" component={RolesDetails}></Route>
          <Route path="/roles" component={Roles}></Route>
          <Route path="/permissions" component={Permissions}></Route>
        </Switch>
      </div>
    );
  }
}

export default PageCover;
