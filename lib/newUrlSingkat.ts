import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export default async function newUrlSingkat(
  url_singkat: string,
  url_base: string,
  user: User
) {
  const { error } = await supabase
    .from("tautan")
    .insert({
      email_user: user.email,
      url_singkat,
      url_base,
    })
    .select();
  if (error)
    return {
      error: true,
      errorMessage: error.message,
    };
  if (!error)
    return {
      error: false,
      errorMessage: "",
    };
}
