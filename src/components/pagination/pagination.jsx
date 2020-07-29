import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import UsersTable from "../../pages/artisans/users-table";
import PageLoader from "../../components/loader/pageLoader";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function PaginationControlled({ handleChange, page, total, allUsers }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {allUsers ? (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <UsersTable allUsers={allUsers} />
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

export default PaginationControlled;
