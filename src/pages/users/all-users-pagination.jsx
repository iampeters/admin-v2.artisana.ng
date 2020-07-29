import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import AllMainUserTable from "./all-main-users-table";
import CircularIndeterminate from "../../components/loader/loader";
import PageLoader from "../../components/loader/pageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function AllUsersPagination({ handleChange, page, total, allMainUsers }) {
  const classes = useStyles();
  console.log(allMainUsers);
  return (
    <div className={classes.root}>
      {allMainUsers ? (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <AllMainUserTable allMainUsers={allMainUsers} />
          </div>
          <Pagination count={total} page={page} onChange={handleChange} />
        </div>
      ) : (
        <div
          style={{
            marginTop: "20%",
          }}
        >
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

export default AllUsersPagination;
