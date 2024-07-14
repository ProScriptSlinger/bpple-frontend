const Layout = ({ children }) => {
  return (
    <>
      <div className="fixed right-0 left-0 top-0 bottom-0  bg-[#1E1E1E]">
        {children}
      </div>
    </>
  );
};
export default Layout;
