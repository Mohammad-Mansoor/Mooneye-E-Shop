"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  console.log(errors[id]);
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
        w-full
        peer p-4
        max-h-[150px]
        min-h-[150px]
        pt-6
        outline-none
        border-2
     bg-white
       font-ligh
       rounded-md
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${errors[id] ? "border-rose-400 " : "border-slate-300"}
      ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
      `}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 orgin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4${
          errors[id] ? "focus:border-rose-500" : "focus:border-slate-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
