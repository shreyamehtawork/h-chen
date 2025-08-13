import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row bg-white rounded shadow-lg overflow-hidden"
        style={{ maxWidth: "1000px", minHeight: "500px" }}
      >
        {/* Left Section */}
        <div className="col-md-6 p-4 border-end d-flex flex-column justify-content-center">
          <h2 className="display-5 fw-bold text-dark mb-3">CHLOE'S VENTURE</h2>
          <p className="fs-5 text-secondary mb-4">
            Where every identity is seen.
            <br />
            Where elegance feels like home.
          </p>
          <img
            src="https://placehold.co/400x300/e0e0e0/555555?text=Brand+Image"
            alt="Brand Aesthetics"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Section */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-center align-items-center gap-3">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Welcome Back!</h2>
            <p className="text-muted">Sign in to your account to continue.</p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
            style={{ maxWidth: "300px" }}
          >
            <FcGoogle size={28} /> Login with Google
          </button>

          <p className="small text-muted text-center mt-3">
            By logging in, you agree to our{" "}
            <a href="#" className="text-decoration-none text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-decoration-none text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
