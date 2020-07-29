import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
class UserDetails extends Component {
  state = {
    id: this.props.match.params.userDetails,
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const id = this.props.match.params.userDetails;
    console.log(this.state.id);
    return (
      <div style={{ marginTop: "30px" }}>
        <ListsUsers />
      </div>
    );
  }
}

export default UserDetails;
