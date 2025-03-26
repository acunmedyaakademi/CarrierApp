import Layout from "./Layout";
import { supabase } from "../../supabaseClient";

export default function HomePage() {
  return (
    <Layout>
      <div className="home-container">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page content.</p>
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.log("Error signing out:", error.message);
          }}
        >
          Sign Out
        </button>
      </div>
    </Layout>
  );
}
