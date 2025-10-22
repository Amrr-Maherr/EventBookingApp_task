import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "../Store/EventsSlice"
import eventDetailsSlice from "../Store/eventDetailsSlice";
export const store = configureStore({
  reducer: {
    events: eventsSlice,
    eventDetails: eventDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
