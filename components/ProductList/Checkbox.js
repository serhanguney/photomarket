import React from "react";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <input type="checkbox" {...props} />
    </div>
  );
}
