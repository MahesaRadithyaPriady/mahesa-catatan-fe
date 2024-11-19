// src/components/MainForm.jsx
const MainForm = ({ children, handle, errorMessage }) => {
  return (
    <form onSubmit={handle}>
      <div className="form-control w-full">
        {errorMessage && (
          <div role="alert" className="alert alert-error">
            <span>{errorMessage}</span>
          </div>
        )}
        {children}
      </div>
    </form>
  );
};

export default MainForm;
