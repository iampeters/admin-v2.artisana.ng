import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import AdminPagination from "../admins/admin-pagination";
import AllUsersPagination from "./all-users-pagination";
class MainUsers extends Component {
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
    const url = `https://sandbox.artisana.ng/api/users/admin/all?page=${page}&&pageSize=${
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
          this.props.sendAllUsers(data);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllUsers("Failed to fetch");
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
    // console.log(this.props.allAdmins);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allMainUsers === "Failed to fetch" ? (
          <BadNetWork />
        ) : (
          <AllUsersPagination
            total={this.props.allMainUsers.total}
            page={this.state.page}
            handleChange={this.handleChange}
            allMainUsers={this.props.allMainUsers.items}
          />
        )}
      </div>
    );
  }
}
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllUsers: (sendData) =>
      dispatch({ type: "all_Main_users", data: sendData }),
  };
};
const mapStateToProps = ({ allMainUsers: { allMainUsers } }) => {
  return {
    allMainUsers,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(MainUsers);
