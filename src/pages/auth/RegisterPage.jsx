import React, { use, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import loginImage from "../../../public/images/undraw_enter_nwx3.png";

function RegisterPage() {
  const { signUpUser, user, signInUserWithGoogle } = use(AuthContext);
  const [loginMsg, setLoginMsg] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_\-+=\[{\]};:'",.<>/?\\|`~]).{6,}$/;

    if (passwordRegex.test(password) === false) {
      setLoginMsg(true);
      return toast.error("Weak Password");
    }

    signUpUser(email, password, name, photoURL)
      .then((user) => {
        toast.success(`Welcome, ${user.user.displayName}`);
        navigate(location.state || "/");
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

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-base-300">
      <div className="auth-page-img mt-[100px] md:mt-0 flex items-center justify-center">
        <img className="w-[200px] md:w-[400px]" src={loginImage} alt="" />
      </div>
      <div className="h-full flex flex-col justify-center items-center px-4 md:px-10">
        <form onSubmit={registerUser} className="p-4 mt-18 w-full md:w-[80%] mx-auto bg-base-100 rounded border border-primary/30">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium "
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
              className="block text-sm font-medium "
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
          <div className="mb-4">
          <label
            htmlFor="photoURL"
            className="block text-sm font-medium text-(--primary-color)"
          >
            Profile Picture
          </label>
          <input
            type="text"
            name="photoURL"
            id="photoURL"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>

          {loginMsg && (
          <div className="text-red-500 my-3 font-light">
            <ul>
              <li>Must have an Uppercase letter in the password </li>
              <li>Must have a Lowercase letter in the password</li>
              <li>Must have a special character in the password</li>
              <li>Length must be at least 6 character</li>
            </ul>
          </div>
        )}

          <p className="my-2">
            Have have a account?{" "}
            <b>
              <Link className="text-green-700" to="/login">
                Login
              </Link>
            </b>
          </p>
          <p>Or register with</p>
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

export default RegisterPage;
