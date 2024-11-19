import { Link } from "react-router-dom";
const CardwithSideImage = ({ content, children }) => {
  const { img, title, heroTitle, heroDescription, btnHeroText, btnHeroLink } =
    content;
  return (
    <div className="card lg:card-side  bg-base-100 shadow-xl hover:shadow-2xl mx-5 max-sm:my-24">
      <figure
        className="max-sm:h-80 min-md:h-96 
        min-[1028]:max-h-96"
      >
        <div
          className="hero w-full h-full "
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="hero-overlay bg-opacity-80"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md max-md:p-8 max-lg:p-10  max-sm:p-3">
              <h1 className="mb-5 max-sm:text-3xl max-md:text-4xl text-5xl font-bold max-sm:mt-4 min-md:p-">
                {heroTitle ? heroTitle : "unknown"}
              </h1>
              <p className="mb-5 max-sm:text-sm max-sm:text-start">
                {heroDescription ? heroDescription : "unknown"}
              </p>
              {btnHeroLink && (
                <Link to={btnHeroLink}>
                  <button className="btn btn-primary">
                    {btnHeroText ? btnHeroText : "unknown"}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl font-bold">
          {title ? title : "unknown"}
        </h2>

        {children ? children : "Unknown"}
      </div>
    </div>
  );
};

export default CardwithSideImage;
