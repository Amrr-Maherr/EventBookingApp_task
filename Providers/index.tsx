import { store } from "@/Store/Store";
import { Provider } from "react-redux";
import React from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function Index({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardProvider>
      <Provider store={store}>{children}</Provider>
    </KeyboardProvider>
  );
}
