import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import UsersTable from "../../pages/artisans/users-table";
import AddIcon from "@material-ui/icons/Add";
import PageLoader from "../../components/loader/pageLoader";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import RolesTable from "./roles-table";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function RolesPagination({ handleChange, page, total, allRoles }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {allRoles ? (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div className="row m-0">
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                }}
              >
                Roles
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
                <Link to="/roles/create">
                  <Button style={{ background: "#974578", color: "white" }}>
                    New
                    <AddIcon />
                  </Button>
                </Link>
              </div>
              <div className="col-lg-12">
                <RolesTable allRoles={allRoles} />
              </div>
            </div>
          </div>
          <Pagination count={total} page={page} onChange={handleChange} />
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

export default RolesPagination;
