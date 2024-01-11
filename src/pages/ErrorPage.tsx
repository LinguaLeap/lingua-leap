import { Link } from 'react-router-dom';
import IMAGES from '../images/Images';
const ErrorPage = () => {
  return (
    <div className="error-page-container bg-light  dark:bg-deep-navy-blue min-h-screen">
      <div className="flex items-center justify-center h-screen dark:text-white  ">
        <div className="text-center">
          <img src={IMAGES.error} className="max-w-full mb-8" />
          <h1 className="text-4xl font-bold mb-6">
            Oops! Something went wrong.
          </h1>
          <h1 className="text-4xl font-bold mb-6">Take deep long breath...</h1>
          <p className="text-xl mb-4 ">
            It seems like there's an issue with the page you're looking for.
          </p>
          <p className="text-xl mb-7">
            Don't worry, you can go back to the homepage and try again.
          </p>
          <Link to="/" className="button">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
