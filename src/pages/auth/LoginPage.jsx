import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import loginImage from "../../../public/images/undraw_enter_nwx3.png";

function LoginPage() {
  const navigate = useNavigate();

  const { signInUser, user, signInUserWithGoogle } = use(AuthContext);

  const loginUser = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((user) => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const signinWithGoogle = (e) => {
    e.preventDefault();
    signInUserWithGoogle().then((user) => {
      if (user) {
        toast.success(`Welcome, ${user.user.displayName}`);
        navigate(location.state || "/");
      }
    });
  };

  if (user) {
    navigate("/");
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="auth-page-img mt-[100px] md:mt-0 flex items-center justify-center">
        <img className="w-[200px] mx:w-[400px]" src={loginImage} alt="" />
      </div>
      <div className="h-full flex flex-col justify-center items-center px-4 md:px-10">
        <form onSubmit={loginUser} className="p-4 w-full md:w-[80%] mx-auto">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
          <p className="my-2">
            Don't have a account?{" "}
            <b>
              <Link className="text-green-700" to="/register">
                Register
              </Link>
            </b>
          </p>
          <p>Or login with</p>
          <div className="">
            <button
              onClick={signinWithGoogle}
              className="btn btn-primary btn-block"
            >
              GMAIL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
