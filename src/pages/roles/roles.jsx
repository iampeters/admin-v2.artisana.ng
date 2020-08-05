import { Pages } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import PaginationControlled from "../../components/pagination/pagination";
import RolesPagination from "./rolesPagination";

class Roles extends Component {
  state = {
    page: 0,
    pageSize: 25,
    whereCondition: {},
    filter: {},
  };

  handleRequest = (paginationConfig = this.state) => {
    let page = paginationConfig.page + 1;

    this.setState({
      whereCondition: this.state.filter,
    });
    let filter = paginationConfig.whereCondition;

    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles?page=${page}&&pageSize=${
      paginationConfig.pageSize
    }&&whereCondition=${JSON.stringify(filter)}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);
          this.props.sendAllRoles(data);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllRoles("Failed to fetch");
      });
  };
  componentDidMount() {
    this.handleRequest();
  }

  handleChange = (event) => {
    this.setState({
      page: 1,
    });
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allAdminUsers === "Failed to fetch" ? (
          <BadNetWork />
        ) : (
          <RolesPagination
            page={this.state.page}
            allRoles={this.props.allRoles.items}
            handleChange={this.handleChange}
            total={this.props.allRoles.total}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ totalRoles: { allRoles } }) => {
  return {
    allRoles,
  };
};
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllRoles: (sendData) => dispatch({ type: "all_roles", data: sendData }),
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Roles);
