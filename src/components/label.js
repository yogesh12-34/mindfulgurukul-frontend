import React from "react";

function Label({ title }) {
  return (
    <label
      htmlFor="email"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {title}
    </label>
  );
}

export default Label;
