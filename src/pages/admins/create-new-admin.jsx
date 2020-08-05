import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
class CreateNewAdmin extends Component {
  state = {
    message: "",
    imageUrl: "myImages",
    permissions: [],
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };
  handleFile = (evt, attr) => {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    if (evt.target.files[0]) {
      const image = evt.target.files[0];
      let fd = new FormData();

      fd.append("imageUrl", image);
      const url = `https://sandbox.artisana.ng/api/configuration/fileUpload`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.token}`,
        },
        body: fd,
      }).then((data) => {
        data.json().then((data) => {
          this.setState({
            imageUrl: data.result,
          });
        });
      });
    }
  };
  handleCreate = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };
  handleSubmit = () => {
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.email === "" ||
      this.state.phoneNumber === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.setState({
        message: "Please fill all empty fields",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: "Password does not match",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        message: "Your password must be atleast 6 characters",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } else {
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        imageUrl,
        permissions,
        phoneNumber,
      } = this.state;
      const getActiveAdmin = JSON.parse(
        localStorage.getItem("persist:adminAuth")
      );
      const userTokens = JSON.parse(getActiveAdmin.adminAuth);
      const tokens = userTokens.adminStatus;

      let url = "https://sandbox.artisana.ng/api​/admins​/create";
      fetch("https://sandbox.artisana.ng/api​/admins​/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword,
          imageUrl: imageUrl,
          permissions: permissions,
        }),
      }).then((data) => {
        data
          .json()
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };
  render() {
    return (
      <div style={{ marginTop: "150px" }}>
        {this.state.imageUrl ? (
          <div className="row m-0">
            {this.state.message ? (
              <div className="col-lg-11" style={{ marginBottom: "20px" }}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {this.state.message}
                </Alert>
              </div>
            ) : (
              ""
            )}
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="First Name"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "firstname")}
                value={this.state.firstname}
              />
            </div>
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Last Name"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "lastname")}
                value={this.state.lastname}
              />
            </div>
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Email Address"
                type="email"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "email")}
                value={this.state.email}
              />
            </div>
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Phone Number"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "phoneNumber")}
                value={this.state.phoneNumber}
              />
            </div>
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "password")}
                value={this.state.password}
              />
            </div>
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "confirmPassword")}
                value={this.state.confirmPassword}
              />
            </div>
            <div className="col-lg-12">
              <Button
                style={{ background: "#974578", color: "white" }}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        ) : (
          <div className="container col-lg-5">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={(evt) => this.handleFile(evt, "imageupload")}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CreateNewAdmin;
