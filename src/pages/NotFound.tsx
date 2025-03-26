import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container my-4">
      <h1>Not Found!</h1>
      <p className="text-secondary">
        return to{" "}
        <Link to="/" className="text-secondary">
          homepage?
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
