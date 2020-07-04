import React, { Fragment } from "react";
import spinner from "./loading.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "40vw", margin: "auto", display: "block" }}
      alt='Loading...'
    />
  </Fragment>
);

export default React.memo(Spinner);
