import React, { memo, useState } from "react";
import { IoKeyOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

import Button from "components/atoms/Button";
import Input from "components/atoms/Input";

import { register as registerPost } from "models/auth";
import { uploadImage } from "models/upload";
import { useSettingStore } from "stores/setting.store";

const RegisterForm = () => {
  // store
  const setShowMessage = useSettingStore(
    ({ setShowMessage }) => setShowMessage
  );

  // state
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = ({
    email,
    fullName,
    password,
    confirmPassword,
    profilePic,
  }) => {
    registerPost({
      email,
      fullName,
      password,
      confirmPassword,
      profilePic,
    })
      .then((res) => {
        setShowMessage({
          type: "SUCCESS",
          text: "Pendaftaran berhasil!",
        });
        reset();
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

  const onSubmit = async ({
    email,
    fullName,
    password,
    confirmPassword,
    profilePic,
  }) => {
    setLoading(true);

    if (profilePic?.length) {
      return uploadImage({ image: profilePic[0] })
        .then((res) => {
          handleRegister({
            email,
            fullName,
            password,
            confirmPassword,
            profilePic: res.data.fileName,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError("profilePic", {
            type: "server",
            message: "Error when upload file",
          });
        });
    }

    handleRegister({
      email,
      fullName,
      password,
      confirmPassword,
    });
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
          label="Full Name"
          leftIcon={<IoPersonOutline />}
          className="w-full"
          error={errors?.fullName?.message || ""}
          {...register("fullName", {
            required: "Full name harus diisi",
            minLength: {
              value: 1,
              message: "Full name minimal 1 karakter",
            },
            maxLength: {
              value: 60,
              message: "Full name maksimal 60 karakter",
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
      <div>
        <Input
          type="password"
          label="Confirm Password"
          leftIcon={<IoKeyOutline />}
          className="w-full"
          error={errors?.confirmPassword?.message || ""}
          {...register("confirmPassword", {
            required: "Confirm password harus diisi",
          })}
        />
      </div>
      <div>
        <Input
          type="file"
          label="Photo Profile"
          className="w-full"
          error={errors?.profilePic?.message || ""}
          {...register("profilePic")}
        />
      </div>
      <Button
        type="submit"
        label="Create your free account"
        className="w-full justify-center"
        loading={loading}
      />
    </form>
  );
};

export default memo(RegisterForm);
