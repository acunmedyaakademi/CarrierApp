import { supabase } from "../supabaseClient";

export const getUserMetadata = async (session) => {
  const userMetadata = {
    name: "",
    email: "",
    phone: "",
  };

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (error) {
    console.error("Error fetching user metadata:", error);
  } else {
    userMetadata.email = session.user.email;
    userMetadata.name = data.name;
    userMetadata.phone = data.phone;
  }
  return userMetadata;
};
