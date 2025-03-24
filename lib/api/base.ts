/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { API_URL } from "../constant";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    Authorization: session.user.token,
    ...options.headers,
  };

  // console.log(endpoint, options);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || `API error: ${response.status}`);
  }

  return response;
}

// Helper for GET requests
export async function get(
  endpoint: string,
  options: {
    headers?: Record<string, string>;
    responseType?: "json" | "blob";
  } = {}
) {
  const response = await fetchWithAuth(endpoint, {
    headers: options.headers,
  });
  return options.responseType === "blob" ? response.blob() : response.json();
}

// Helper for POST requests
export async function post(
  endpoint: string,
  data: any,
  headers?: Record<string, string>
) {
  const response = await fetchWithAuth(endpoint, {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers:
      headers ||
      (data instanceof FormData ? {} : { "Content-Type": "application/json" }),
  });
  return response.json();
}

// Helper for PUT requests
export async function put(
  endpoint: string,
  data: any,
  headers?: Record<string, string>
) {
  const response = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
  return response.json();
}

// Helper for DELETE requests
export async function del(endpoint: string, headers?: Record<string, string>) {
  const response = await fetchWithAuth(endpoint, {
    method: "DELETE",
    headers,
  });
  return response.json();
}
