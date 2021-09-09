import React, { memo, useState } from "react";
import { IoKeyOutline, IoMailOutline } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";

import Button from "components/atoms/Button";
import Checkbox from "components/atoms/Checkbox";
import Input from "components/atoms/Input";
import { login } from "models/auth";

const LoginForm = () => {
  // state
  const [loading, setLoading] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    setLoading(true);

    login({ email, password })
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        const { status, data } = err?.response || {};

        if (status === 400) {
          Object.keys(data).forEach((key) => {
            setError(key, {
              type: "server",
              message: data[key],
            });
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <Input
          label="Email Address"
          leftIcon={<IoMailOutline />}
          className="w-full"
          autoFocus
          error={errors?.email?.message || ""}
          {...register("email", {
            required: "Email harus diisi",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Format email tidak valid",
            },
          })}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          leftIcon={<IoKeyOutline />}
          className="w-full"
          error={errors?.password?.message || ""}
          {...register("password", {
            required: "Password harus diisi",
          })}
        />
      </div>
      <div className="flex justify-between items-center">
        <Controller
          name="rememberMe"
          control={control}
          defaultValue={false}
          render={({ field }) => <Checkbox label="Remember me" {...field} />}
        />
      </div>

      <Button
        type="submit"
        label="Sign in"
        className="w-full justify-center"
        loading={loading}
      />
    </form>
  );
};

export default memo(LoginForm);
