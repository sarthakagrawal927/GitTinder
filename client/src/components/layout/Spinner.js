import React, { Fragment } from "react";
import spinner from "./loading.gif";
import LazyLoad from "react-lazyload";

const Spinner = () => (
  <Fragment>
    <LazyLoad once='true'>
      <img
        src={spinner}
        style={{ width: "40vw", margin: "auto", display: "block" }}
        alt='Loading...'
      />
    </LazyLoad>
  </Fragment>
);

export default React.memo(Spinner);
