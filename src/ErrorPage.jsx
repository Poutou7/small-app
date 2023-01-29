import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-page">
      <div className="left-page flex-batween">
        <div className="flex-batween">
          <h1>{error.status}</h1>
          <p>Page {error.statusText}</p>
        </div>
      </div>
      <div className="right-page flex-batween">
        <h1>Oops!</h1>
        <p>page {error.statusText} on server</p>
        <p>
          Sorry, an unexpected error has occurred. Sorry, an unexpected error
          has occurred. Sorry, an unexpected error has occurred.
        </p>
        <a href="/">Go To Home</a>
      </div>
    </div>
  );
};

export default ErrorPage;
