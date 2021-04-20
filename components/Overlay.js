import React from "react";

import { useAppContext } from "../components/Context";

export default function Overlay() {
  const {
    cart: { seeFilter },
  } = useAppContext();
  return <div className={`overlay ${seeFilter ? "overlay-reveal" : ""}`}></div>;
}
