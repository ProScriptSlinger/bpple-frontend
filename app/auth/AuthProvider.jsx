"use client";
import withAuth from "./withAuth";
const WithAuthProvider = ({ children }) => {
  return <>{children}</>;
};

export default withAuth(WithAuthProvider);
