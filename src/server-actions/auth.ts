"use server";

import { createClient } from "@/supabase/server";
import { User } from "@/lib/types";

type UserLoginData = {
  email: string;
  password: string;
};

type UserRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export const login = async (authData: UserLoginData) => {
  const { email, password } = authData;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  const { id } = data.user;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (profileError) {
    console.log(profileError);
    return { error: profileError.message };
  }
  return { data: profile as User };
};

export const register = async (authData: UserRegisterData) => {
  const { firstName, lastName, email, password, role } = authData;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: ["admin", "patient", "doctor"].includes(role) ? role : "patient",
      },
    },
  });

  if (error || !data.user) {
    return {
      error:
        error?.message ?? "Unknown error occured while registering new user.",
    };
  }

  const { user, session } = data;
  const { id, user_metadata } = user;
  console.log({
    id: id,
    first_name: user_metadata.first_name,
    last_name: user_metadata.last_name,
    email: user.email,
    role: user_metadata.role,
  });
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert([
      {
        id: id,
        first_name: user_metadata.first_name,
        last_name: user_metadata.last_name,
        email: user.email,
        role: user_metadata.role,
      },
    ]);

  if (profileError) {
    return { error: profileError.message };
  }

  return { data: (profileData ?? user_metadata) as User };
};

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { data: "User logged out successfully." };
};

export const getProfile = async (userID?: string) => {
  const supabase = await createClient();
  let id = userID;
  if (!id) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { error: "No authenticated user found." };
    }
    id = user.id;
  }
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*, patient:patients(*), doctor:doctors(*)")
    .eq("id", id)
    .single();

  if (profileError) {
    console.log(profileError);
    return { error: profileError.message };
  }

  return { data: profile as User };
};

export const getPatientDetails = async (userId: string) => {
  return (await createClient())
    .from("patients")
    .select("*,profile:profiles(*)")
    .eq("id", userId)
    .single();
};

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message };
  }

  return { data: user };
};
