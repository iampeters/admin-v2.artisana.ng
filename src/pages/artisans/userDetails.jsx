import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
import PageLoader from "../../components/loader/pageLoader";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

import { getDate } from "../../components/time-date-converter/time-date-converter";
import { Button } from "@material-ui/core";
class UserDetails extends Component {
  state = {
    id: this.props.match.params.userDetails,
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    imageUrl: "",
    nickname: "",
    hasResult: false,
    NIN: "",
    state: "",
    createdOn: "",
    updatedOn: "",
    updatedBy: "",
    userId: "",
    businessName: "",
    country: "",
    rating: "",
    reviews: "",
    RCNumber: "",
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/artisans/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);
          const firstname = data.result.firstname;
          const lastname = data.result.lastname;
          const email = data.result.email;
          const phoneNumber = data.result.phoneNumber;
          const address = data.result.address;
          const specialization = data.result.specialization;
          const imageUrl = data.result.imageUrl;
          const nickname = data.result.nickname;
          const NIN = data.result.NIN;
          const state = data.result.state;
          const businessName = data.result.businessName;
          const country = data.result.country;
          const createdOn = data.result.createdOn;
          const rating = data.result.rating;
          const reviews = data.result.reviews;
          const updatedOn = data.result.updatedOn;
          const updatedBy = data.result.updatedBy;
          const userId = data.result.userId;
          const RCNumber = data.result.RCNumber;
          this.setState({
            hasResult: data.hasResults,
            firstname,
            lastname,
            email,
            phoneNumber,
            address,
            specialization,
            imageUrl,
            nickname,
            NIN,
            state,
            createdOn,
            updatedOn,
            updatedBy,
            userId,
            businessName,
            country,
            rating,
            reviews,
            RCNumber,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleUpadateForm = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };
  render() {
    const id = this.props.match.params.userDetails;
    return (
      <div>
        {this.state.hasResult ? (
          <div style={{ marginTop: "30px" }}>
            <div className="row m-0">
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                }}
              >
                Artisan Details
              </div>
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="/artisans">
                  <Button style={{ background: "#974578", color: "white" }}>
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="col-lg-12"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                  border: "2px solid #974578",
                }}
              >
                <img
                  src={this.state.imageUrl}
                  alt="imageUrl"
                  style={{
                    borderRadius: "100%",
                    width: "100px",
                    height: "100px",
                  }}
                ></img>
              </div>
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
                Artisan Details
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  First Name
                </span>
                <br></br>
                {this.state.firstname}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Last Name
                </span>
                <br></br>
                {this.state.lastname}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Email Address
                </span>
                <br></br>
                {this.state.email}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Phone Number
                </span>
                <br></br>
                {this.state.phoneNumber}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Address
                </span>
                <br></br>
                {this.state.address}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Specialization
                </span>
                <br></br>
                {this.state.specialization}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Nickname
                </span>
                <br></br>
                {this.state.nickname ? this.state.nickname : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  National identification Number
                </span>
                <br></br>
                {this.state.NIN ? this.state.NIN : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Registration Number
                </span>
                <br></br>
                {this.state.RCNumber ? this.state.RCNumber : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  State
                </span>
                <br></br>
                {this.state.state ? this.state.state : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Country
                </span>
                <br></br>
                {this.state.country ? this.state.country : "N/A"}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Rating
                </span>
                <br></br>
                {this.state.rating}
              </div>
              <div
                className="col-lg-6"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Reviews
                </span>
                <br></br>
                {this.state.reviews}
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

export default UserDetails;
