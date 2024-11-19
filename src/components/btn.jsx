const Btn = ({ children, typeBtn, onclickHandler, singleAction }) => {
  return (
    <>
      <button
        onClick={onclickHandler || undefined}
        className={`${typeBtn ? `btn btn-${typeBtn}` : "btn"} ${
          singleAction || ""
        }`}
      >
        {children}
      </button>
    </>
  );
};

export default Btn;
