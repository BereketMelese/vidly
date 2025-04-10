import React from "react";

const Heart = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
      style={{ color: props.liked ? "red" : "", cursor: "pointer" }}
    ></i>
  );
};

export default Heart;
