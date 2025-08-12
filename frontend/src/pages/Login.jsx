import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  //   return <button onClick={handleLogin}>Login with Google</button>;

  return (
    <div className="w-full h-[90vh] flex items-center justify-center  bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden min-h-[500px]">
        {/* Left Section (Image/Marketing Text) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-start border-r border-gray-200">
          <h2 className="text-4xl font-serif-custom text-gray-800 leading-tight mb-4">
            CHLOE'S VENTURE
          </h2>
          <p className="text-xl font-serif-custom text-gray-700 leading-relaxed">
            Where every identity is seen.
            <br />
            Where elegance feels like home.
          </p>
          {/* Placeholder for the main image if it were dynamic */}
          <div className="mt-8 w-full">
            <img
              src="https://placehold.co/400x300/e0e0e0/555555?text=Brand+Image"
              alt="Brand Aesthetics"
              className="rounded-md w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center relative gap-5">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-serif-custom text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-20 text-center">
            Sign in to your account to continue.
          </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-1 w-full max-w-xs px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <FcGoogle size={28} />
            Login with Google
          </button>

          <p className="text-sm text-gray-500 text-center">
            By logging in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
