import { Input, Button, Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export type LoginFormData = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    const trimmedData = {
      ...data,
      username: data.username.trim(),
    };
    mutate(trimmedData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px] px-4"
      >
        <h1 className="text-xl font-bold text-center">Login to your account</h1>

        <Input
          label="Username"
          placeholder="Enter your username"
          {...register("username", {
            validate: (value) =>
              value.trim() ? true : "Username is required.",
          })}
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          {...register("password", {
            required: "Password is required.",
          })}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />

        <Button
          className="w-full h-[55px] font-semibold"
          type="submit"
          color="primary"
          isLoading={isPending}
          spinner={<Spinner color="white" size="sm" variant="simple" />}
        >
          Login
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-500">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-primary-500 hover:underline text-sm font-medium"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
