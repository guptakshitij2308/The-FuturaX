"use client";

import { createContext, useState, useContext } from "react";

const initialState = { from: undefined, to: undefined };

const ReservationContext = createContext();

// Using context api in a nextjs app always this works only : Create a component and pass server component as props where it is req.
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

// Providers should always be placed as deep down as possible in the component tree to avoid re renders.
// But if we need this data in other parts of the app tree also , we should provide it in the root layout of the app.

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("Context was used outside the provider.");
  return context;
}

export { ReservationProvider, useReservation };
