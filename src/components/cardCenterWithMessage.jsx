const CardCenter = ({ children, message, title, typeAlert }) => {
  return (
    <>
      <div className=" flex flex-col form-control min-h-screen justify-center items-center">
        <div className="card bg-base-200 p-5 shadow-md hover:shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl text-center font-bold mb-5">{title}</h1>
            <div className="text-center">
              {message ? (
                <div className="notif shadow-lg rounded-full mb-12">
                  <div
                    role="alert"
                    className={
                      typeAlert
                        ? `alert alert-${typeAlert}`
                        : "alert alert-error"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="font-semibold text-lg">{message}</span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCenter;
