import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import AdminPagination from "../admins/admin-pagination";
class Admins extends Component {
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
    const url = `https://sandbox.artisana.ng/api/admins/?page=${page}&&pageSize=${
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
          this.props.sendAllAdmins(data);
        });
      })
      .catch((error) => {
        this.props.sendAllAdmins("Failed to fetch");
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
        {this.props.allAdmins === "Failed to fetch" ? (
          <BadNetWork />
        ) : (
          <AdminPagination
            total={this.props.allAdmins.total}
            page={this.state.page}
            handleChange={this.handleChange}
            allAdmins={this.props.allAdmins.items}
          />
        )}
      </div>
    );
  }
}
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllAdmins: (sendData) =>
      dispatch({ type: "all_admins", data: sendData }),
  };
};
const mapStateToProps = ({ allAdmins: { allAdmins } }) => {
  return {
    allAdmins,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Admins);
