const Layout = ({ children }) => {
  return (
    <>
      <div className="overflow-auto h-fit">{children}</div>
    </>
  );
};
export default Layout;
