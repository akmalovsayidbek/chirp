import { Input, Button, Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export type SignUpFormData = {
  name: string;
  username: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    const trimmedData = {
      ...data,
      name: data.username.trim(),
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
        <h1 className="text-xl font-bold text-center">Create a new account</h1>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register("name", {
            validate: (value) => {
              const trimmed = value.trim();
              if (!trimmed) return "Name is required.";
              if (trimmed.length > 30)
                return "Name cannot exceed 30 characters.";
              return true;
            },
          })}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />

        <Input
          label="Username"
          placeholder="Enter your username"
          {...register("username", {
            validate: (value) => {
              const trimmed = value.trim();
              if (!trimmed) return "Username is required.";
              if (trimmed.startsWith("_"))
                return "Username cannot start with '_'.";
              if (!/^[a-zA-Z0-9_]+$/.test(trimmed))
                return "Only letters, numbers, and _ are allowed.";
              if (trimmed.includes("__"))
                return "Username cannot contain consecutive '__'.";
              if (trimmed.length < 3)
                return "Username must be at least 3 characters.";
              if (trimmed.length > 15)
                return "Username cannot exceed 15 characters.";
              return true;
            },
          })}
          isInvalid={!!errors.username}
          errorMessage={errors.username?.message}
        />

        <Input
          label="Password"
          type={isVisible ? "text" : "password"}
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
            maxLength: {
              value: 64,
              message: "Password cannot exceed 64 characters.",
            },
          })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          endContent={
            <button
              type="button"
              aria-label="toggle password visibility"
              onClick={toggleVisibility}
              className="focus:outline-none"
            >
              {isVisible ? (
                <HiOutlineEyeSlash className="text-2xl text-default-400" />
              ) : (
                <HiOutlineEye className="text-2xl text-default-400" />
              )}
            </button>
          }
        />

        <Button
          className="w-full h-[55px] font-semibold"
          type="submit"
          color="primary"
          isLoading={isPending}
          spinner={<Spinner color="white" size="sm" variant="simple" />}
        >
          Sign Up
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-primary-500 hover:underline text-sm font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
