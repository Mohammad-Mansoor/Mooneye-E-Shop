"use client";

import React from "react";
import { FieldErrors, FieldPathValue, UseFormRegister } from "react-hook-form";
interface InputProps {
  id: string;
  lable: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldPathValue>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  lable,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  return <div></div>;
};

export default Input;
