import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import PaginationControlled from "../../components/pagination/pagination";

class Users extends Component {
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
    const url = `https://sandbox.artisana.ng/api/artisans/admin/all?page=${page}&&pageSize=${
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
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allAdminUsers === "Failed to fetch" ? (
          <BadNetWork />
        ) : (
          <PaginationControlled
            handleChange={this.handleChange}
            page={this.state.page}
            total={this.props.allAdminUsers.total}
            allUsers={this.props.allAdminUsers.items}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ adminUsers: { allAdminUsers } }) => {
  return {
    allAdminUsers,
  };
};
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllUsers: (sendData) =>
      dispatch({ type: "all_admin_users", data: sendData }),
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Users);
