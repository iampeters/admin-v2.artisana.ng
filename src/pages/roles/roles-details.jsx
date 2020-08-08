import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
import PageLoader from "../../components/loader/pageLoader";
import CheckIcon from "@material-ui/icons/Check";
import { getDate } from "../../components/time-date-converter/time-date-converter";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import CircularIndeterminate from "../../components/loader/loader";
class RolesDetails extends Component {
  state = {
    loader: false,
    id: this.props.match.params.roleDetails,
    name: "",
    createdOn: "",
    updatedOn: "",
    updatedBy: "",
    permissions: "",
    hasResult: "",
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);

          const createdOn = data.result.createdOn;
          const permissions = data.result.permissions;
          const updatedOn = data.result.updatedOn;
          const updatedBy = data.result.updatedBy;
          const name = data.result.name;
          const hasResult = data.hasResults;
          this.setState({
            createdOn,
            updatedOn,
            updatedBy,
            name,
            permissions,
            hasResult,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (id) => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles/delete/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data
        .json()
        .then((data) => {
          console.log(data);
          this.setState({
            loader: false,
          });
          window.location.href = "/roles";
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader: false,
          });
        });
    });
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="row m-0">
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            Role Details
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/roles">
              <Button
                variant="outlined"
                style={{ color: "#974578", marginRight: "10px" }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>

        {this.state.hasResult ? (
          <div style={{ marginTop: "30px" }}>
            <div
              className="col-lg-12"
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <Link to={"/admins/update/" + this.state.userId}>
                <Button style={{ background: "#974578", color: "white" }}>
                  Update
                </Button>
              </Link>
            </div>
            <div className="row m-0" style={{ paddingLeft: "15px" }}>
              <div
                className="col-lg-12"
                style={{
                  marginBottom: "20px",
                  fontWeight: "bold",
                  color: " #974578",
                }}
              >
                Role Details
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Name
                </span>
                <br></br>
                {this.state.name ? this.state.name : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Updated On
                </span>
                <br></br>
                {this.state.updatedOn ? this.state.updatedOn : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Updated By
                </span>
                <br></br>
                {this.state.updatedBy ? this.state.updatedBy : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Created On
                </span>
                <br></br>
                {this.state.createdOn ? getDate(this.state.createdOn) : "N/A"}
              </div>

              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                {this.state.loader ? (
                  <Button style={{ background: "#974578", color: "white" }}>
                    <CircularIndeterminate />
                  </Button>
                ) : (
                  <Button
                    style={{ background: "#974578", color: "white" }}
                    onClick={() => this.handleDelete(this.state.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20%" }}>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <PageLoader />
            </div>
            <div
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "18px",
                marginTop: "5px",
                color: "#974578",
              }}
            >
              Loading...
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RolesDetails;
