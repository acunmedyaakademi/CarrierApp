import "./Global.css";

import Login from "./components/Login";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "SIGNED_IN") {
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  return <Login />;
};

export default App;
