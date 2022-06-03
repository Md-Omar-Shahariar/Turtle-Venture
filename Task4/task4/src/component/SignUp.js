import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [signInWithGoogle, gUser, gloading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  let from = location.state?.from?.pathname || "/";
  // if (token) {
  //   navigate(from, { replace: true });
  // }
  let errorMessage;
  if (error || gError || updateError) {
    errorMessage = (
      <p className="text-red-500">{error?.message || gError?.message}</p>
    );
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);

    await updateProfile({ displayName: data.name });
    console.log("Updated");
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen py-20 flex justify-center items-center">
      <div className="card w-96 shadow-2xl shadow-current">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Sign-Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="font-bold">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </label>
            </div>
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
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a Valid Email",
                  },
                })}
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
              value="Sign-Up"
            />
          </form>
          <p className="font-bold">
            Already Have An Account ?{" "}
            <Link to="/login" className="text-secondary">
              Please Log In
            </Link>
          </p>

          <div className="divider font-bold">OR</div>
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
    </div>
  );
};

export default SignUp;
