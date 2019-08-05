import React from "react";
import { Link as GatsbyLink } from "gatsby";
import isAbsoluteUrl from "is-absolute-url";

const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} {...props} />
  ) : (
    <GatsbyLink to={to} {...props} />
  );

export default Link;
