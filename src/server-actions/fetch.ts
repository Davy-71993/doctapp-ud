"use server";

import { Facility, Message } from "@/lib/types";
import { createClient } from "@/supabase/server";
import { getProfile } from "./auth";
import { error } from "console";
import { PostgrestError } from "@supabase/supabase-js";

export const getHealthData = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return await supabase
    .from("patients")
    .select("health_data")
    .eq("user_id", data.user?.id)
    .single();
};

export const getRecentActivities = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return await supabase
    .from("activities")
    .select("*")
    .eq("user_id", data.user?.id)
    .order("created_at", { ascending: false })
    .limit(10);
};

export const getSpecialists = async () => {
  const supabase = await createClient();
  return await supabase.from("doctors").select("*, profile:profiles(*)");
};

export const getMySpecialists = async () => {
  const supabase = await createClient();
  return await supabase
    .from("patients")
    .select("doctors(*,profile:profiles(*))")
    .single();
};

export const getSpecailistDetails = async (specialistId: string) => {
  const supabase = await createClient();
  return await supabase
    .from("doctors")
    .select("*, profile:profiles(*), patients(count)")
    .eq("id", specialistId)
    .single();
};

export const addAppointment = async (appointment: any) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: patientData } = await supabase
    .from("patients")
    .select("id")
    .eq("user_id", data.user?.id)
    .single();

  const appointmentData = {
    ...appointment,
    patient_id: patientData?.id ?? null,
  };

  console.log(appointmentData);
  return await supabase.from("appointments").insert(appointmentData);
};

export const getAppointments = async (filters?: {
  p_id?: string;
  d_id?: string;
  f_id?: string;
}) => {
  const supabase = await createClient();
  let query = supabase
    .from("appointments")
    .select(
      "*, doctor:doctors(*, profile:profiles(*)), patient:patients(*, profile:profiles(*)), facility:facilities(*)"
    );

  if (filters?.p_id) {
    query = query.eq("patient_id", filters.p_id);
  }

  if (filters?.d_id) {
    query = query.eq("doctor_id", filters.d_id);
  }

  if (filters?.f_id) {
    query = query.eq("facility_id", filters.f_id);
  }
  return await query
    .neq("status", "deleted")
    .order("appointment_date", { ascending: true });
};

export const updateAppointment = async (
  appointmentId: string,
  updates: { [key: string]: any }
) => {
  const supabase = await createClient();
  return await supabase
    .from("appointments")
    .update(updates)
    .eq("id", appointmentId);
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: string
) => {
  const supabase = await createClient();
  return await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId);
};

export const getContacts = async (userType?: "patient" | "specialist") => {
  let user_type = userType;
  if (!user_type) {
    user_type = "patient";
  }
  let query;
  if (user_type === "patient") {
    query = (await createClient())
      .from("doctors")
      .select("*, profile:profiles(*)");
  } else {
    query = (await createClient())
      .from("doctors_patients")
      .select("*, patient:patients(*,profile:profiles(*))");
  }
  return query;
};

export const sendMessage = async (message: Message) => {
  return await (await createClient()).from("messages").insert(message);
};

export const fetchMessages = async (you_id?: string) => {
  let query = (await createClient()).from("messages").select();
  if (you_id) {
    query = query.or(`sender_id.eq.${you_id},receiver_id.eq.${you_id}`);
  }
  return query;
};

export const getServiceTypes = async () => {
  const supabase = await createClient();
  return await supabase.from("service_types").select("*");
};

export const getFacilities = async (filters?: {
  type?: string;
  id?: string;
  incharge_id?: string;
  kind?: string;
}) => {
  const supabase = await createClient();
  if (filters?.type) {
    return await supabase
      .from("service_types")
      .select("*, facilities(*, incharge:profiles(*))")
      .eq("slug", filters.type)
      .single();
  }
  if (filters?.id) {
    return await supabase
      .from("facilities")
      .select("*, services(*), incharge:profiles(*)")
      .eq("id", filters.id)
      .single();
  }
  if (filters?.incharge_id) {
    return await supabase
      .from("facilities")
      .select("*, services(*), incharge:profiles(*)")
      .eq("incharge_id", filters.incharge_id);
  }

  if (filters?.kind) {
    return await supabase
      .from("facilities")
      .select("*, services(*), incharge:profiles(*)")
      .eq("type", filters.kind);
  }
  return await supabase
    .from("facilities")
    .select("*, services(*), incharge:profiles(*)");
};

export const verifyFacility = async (facility_id: string) => {
  const { data } = await getProfile();
  if (data?.role !== "admin") {
    return { error: "Unauthorized" };
  }
  return (await createClient())
    .from("facilities")
    .update({ verified: true })
    .eq("id", facility_id);
};

export const createFacility = async (facility: any) => {
  console.log(facility);
  return (await createClient()).from("facilities").insert(facility);
};

export const uploadFile = async (file: File, backetName: string) => {
  const supabase = await createClient();
  const base_url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const filePath = `/${file.name}`;
  const { data, error } = await supabase.storage
    .from(backetName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error: `${file.name} failed to upload, ${error.message}` };
  }

  return { url: `${base_url}/storage/v1/object/public/${data.fullPath}` };
};

export const getMedicalOrders = async () => {
  return (await createClient())
    .from("medicine_orders")
    .select("*, facility:facilities(*)");
};

export const placeOrder = async (order: any) => {
  return (await createClient()).from("medicine_orders").insert(order);
};

export const getPatients = async (userId?: string) => {
  const suapabase = await createClient();
  let profile_id = userId;
  if (!profile_id) {
    const { data } = await getProfile();
    profile_id = data?.id;
  }

  if (!profile_id) {
    return { error: "Identification failed", data: null };
  }

  const { data, error } = await suapabase
    .from("profiles")
    .select("*, doctor:doctors(*,patients(*, profile:profiles(*)))")
    .eq("id", profile_id)
    .single();

  return {
    data,
    error: error?.message ?? null,
  };
};

export const reportUser = async (data: any) => {
  return (await createClient()).from("complaints").insert(data);
};

export const getDoctors = async () => {
  return (await createClient())
    .from("doctors")
    .select("*, profile:profiles(*)");
};

export const getAllUsers = async () => {
  return (await createClient())
    .from("profiles")
    .select("*, doctor:doctors(*), patient:patients(*)");
};

export const createRefferal = async (refferal: any) => {
  const { data } = await getProfile();
  const doctor_id = data?.doctor?.id;
  return (await createClient())
    .from("refferals")
    .insert({ ...refferal, doctor_id });
};

export const uploadFiles = async (
  files: File[],
  backetName: string,
  folderName: string
) => {
  const supabase = await createClient();
  const base_url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const uploadPromises = Array.from(files).map(async (file) => {
    const filePath = `${folderName}/${file.name}`;
    const { data, error } = await supabase.storage
      .from(backetName)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return { error: `${file.name} failed to upload, ${error.message}` };
    }
    return { url: `${base_url}/storage/v1/object/public/${data.fullPath}` };
  });

  return await Promise.all(uploadPromises);
};

export const fetchDocuments = async (userId?: string) => {
  let profile_id = userId;
  if (!profile_id) {
    const { data } = await getProfile();
    profile_id = data?.doctor?.id;
  }
  return (await createClient())
    .from("doctors")
    .select("documents")
    .eq("id", profile_id)
    .single();
};

export const uploadDocuments = async (options: {
  urls: string[];
  doctor_id?: string;
  facility_id?: string;
}) => {
  const { urls, doctor_id, facility_id } = options;
  if (doctor_id) {
    return (await createClient())
      .from("doctors")
      .update({ documents: urls })
      .eq("id", doctor_id);
  }

  if (facility_id) {
    return (await createClient())
      .from("facilities")
      .update({ documents: urls })
      .eq("id", facility_id);
  }

  return {
    error: { message: "You must specify either the doctor_id or facility_id" },
  } as unknown as PostgrestError;
};

export const verifySpecialist = async (doctor_id: string) => {
  const { data } = await getProfile();
  if (data?.role !== "admin") {
    return { error: "Unauthorized" };
  }
  return (await createClient())
    .from("doctors")
    .update({ verified: true })
    .eq("id", doctor_id);
};
