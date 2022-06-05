import React from "react";
import { toast, ToastContainer } from "react-toastify";

import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import useToken from "./authentication/useToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [signInWithGoogle, gUser, gloading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user || gUser);
  let errorMessage;
  if (error || gError) {
    errorMessage = (
      <p className="text-red-500">{error?.message || gError?.message}</p>
    );
  }
  let from = location?.state?.from?.pathname || "/";
  console.log(token);

  if (token) {
    navigate(from, { replace: true });
  }

  const reset = async () => {
    const email = document.getElementById("email").value;
    console.log(email);
    if (email) {
      await sendPasswordResetEmail(email);
      if (email) {
        toast("Sent email");
      } else {
        toast.error("Please enter email address");
      }
    } else {
      toast.error("Please Enter Email");
    }
  };

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div className="min-h-screen py-20 flex justify-center items-center ">
      <div className="card w-96 shadow-2xl shadow-current">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="font-bold">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{3}/,
                    message: "Provide a Valid Email",
                  },
                })}
                id="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be Six Characters or more ",
                  },
                })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {errorMessage}

            <input
              className="btn btn-outline  w-full max-w-xs"
              type="submit"
              value="login"
            />
            <p className="mt-3 text-center">
              Forget Password?
              <span
                onClick={() => reset()}
                className="btn btn-link text-decoration-none "
              >
                Reset Password
              </span>
            </p>
          </form>
          <p className="font-bold">
            Don't Have Account?
            <Link to="/signUp" className="ml-2 text-secondary">
              Create New Account
            </Link>
          </p>

          <div className="font-bold divider">OR</div>
          <button
            onClick={() => {
              signInWithGoogle();
            }}
            className="btn btn-outline btn-secondary font-bold"
          >
            Continue With Google
          </button>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
