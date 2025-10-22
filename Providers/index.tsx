import { store } from "@/Store/Store";
import { Provider } from "react-redux";
import React from "react";

export default function Index({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
