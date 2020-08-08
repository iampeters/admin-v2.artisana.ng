import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import PageLoader from "../../components/loader/pageLoader";
import CircularIndeterminate from "../../components/loader/loader";
import TextField from "@material-ui/core/TextField";
import { AssignmentReturned } from "@material-ui/icons";
import PermissionsTable from "../permissions/permissionTable";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Icon } from "@material-ui/core";
import RolesCreateTable from "./roles-create-table";
class CreateRoles extends Component {
  state = {
    name: "",
    canRead: "",
    canUpdate: "",
    canDelete: "",
    canWrite: "",

    loader: false,
  };

  componentDidMount() {
    let url = "https://sandbox.artisana.ng/api/permissions";
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        const canRead = data.items.canRead;
        const name = data.items.name;

        const canUpdate = data.items.canUpdate;
        const canDelete = data.items.canDelete;
        const canWrite = data.items.canWrite;
        this.setState({
          canRead,
          canDelete,
          canUpdate,
          canWrite,
          name,
        });
      });
    });
  }
  handleCreate = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };

  handleSubmit = () => {
    // this.setState({
    //   loader: true,
    // });
    // if (
    //   this.state.name === "" ||
    //   this.state.createdOn === "" ||
    //   this.state.createdBy === ""
    // ) {
    //   this.setState({
    //     message: "Please fill all empty fields",
    //     name: "",
    //     createdBy: "",
    //     createdOn: "",
    //     loader: false,
    //   });
    // } else {
    //   const getActiveAdmin = JSON.parse(
    //     localStorage.getItem("persist:adminAuth")
    //   );
    //   const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    //   const tokens = userTokens.adminStatus;
    //   let url = "https://sandbox.artisana.ng/api/roles/create";
    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${tokens.token}`,
    //     },
    //     body: JSON.stringify({
    //       name: this.state.name,
    //       permissions: this.state.permissions,
    //       createdBy: this.state.createdBy,
    //       createdOn: this.state.createdOn,
    //     }),
    //   }).then((data) => {
    //     data
    //       .json()
    //       .then((data) => {
    //         this.setState({
    //           message: "Roles created successful",
    //           name: "",
    //           createdBy: "",
    //           createdOn: "",
    //           loader: false,
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         this.setState({
    //           name: "",
    //           createdBy: "",
    //           createdOn: "",
    //           loader: false,
    //         });
    //       });
    //   });
    // }
  };
  render() {
    console.log(this.state.canUpdate);
    const handleCheck = (val) => {};
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            Create Roles
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Link to="/roles">
              <Button
                style={{
                  background: " #974578",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          <div className="row m-0">
            {this.state.message ? (
              this.state.message === "Roles created successful" ? (
                <Alert
                  severity="success"
                  className="col-lg-11"
                  style={{ marginBottom: "20px" }}
                >
                  <AlertTitle>Success</AlertTitle>
                  {this.state.message}
                </Alert>
              ) : (
                <div className="col-lg-11" style={{ marginBottom: "20px" }}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {this.state.message}
                  </Alert>
                </div>
              )
            ) : (
              ""
            )}
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Name"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "name")}
                value={this.state.name}
              />
            </div>
            <div id="permissionTable" className="row m-0">
              <div className="col-lg-12">
                {this.state.permissions ? (
                  <div>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Can Read</TableCell>
                            <TableCell align="center">Can Update</TableCell>
                            <TableCell align="center">Can Write</TableCell>
                            <TableCell align="center">Can Delete</TableCell>

                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.permissions.map((row) => (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center">
                                <input
                                  type="checkbox"
                                  onChange={(val) => handleCheck(val)}
                                  checked={row.canRead}
                                ></input>
                              </TableCell>

                              <TableCell align="center">
                                <input type="checkbox"></input>
                              </TableCell>
                              <TableCell align="center">
                                <input type="checkbox"></input>
                              </TableCell>
                              <TableCell align="center">
                                <input type="checkbox"></input>
                              </TableCell>
                              <TableCell align="center">
                                {" "}
                                <Link to={"roles/" + row._id}>
                                  <Button
                                    style={{
                                      background: "#974578",
                                      color: "white",
                                    }}
                                  >
                                    View More
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <div>loading...</div>
                )}
              </div>
            </div>

            {/* <div className="col-lg-12">
              {this.state.loader ? (
                <Button style={{ background: "#974578", color: "white" }}>
                  <CircularIndeterminate />
                </Button>
              ) : (
                <Button
                  style={{ background: "#974578", color: "white" }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoles;
