import "./Global.css";

import { createContext, useEffect, useRef, useState } from "react";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { getUserMetadata } from "./helper";
import { supabase } from "../supabaseClient";

export const DataContext = createContext(null);
export default function App() {
  const isFirstLogin = useRef(true);
  const [loginSession, setLoginSession] = useState(null);
  const [userMetadata, setUserMetadata] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && isFirstLogin.current) {
        setLoginSession(session);
        isFirstLogin.current = false;
        getUserMetadata(session).then((metadata) => {
          setUserMetadata(metadata);
        });
      } else if (event === "SIGNED_OUT") {
        setLoginSession(null);
        isFirstLogin.current = true;
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <DataContext.Provider value={{ userMetadata }}>
      {loginSession ? <HomePage /> : <Login />}
    </DataContext.Provider>
  );
}
