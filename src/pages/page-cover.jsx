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

class PageCover extends Component {
  state = {};
  render() {
    return (
      <div className="pageCont">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route
            path="/users/details/:userDetails"
            component={UserDetails}
          ></Route>
          <Route path="/artisans" component={Artisans}></Route>
          <Route path="/admins/:adminDetails" component={AdminDetails}></Route>
          <Route path="/admins" component={Admins}></Route>
          <Route path="/users/:userId" component={MainUserDetails}></Route>
          <Route path="/users" component={MainUsers}></Route>
          <Route path="/roles" component={Roles}></Route>
        </Switch>
      </div>
    );
  }
}

export default PageCover;
