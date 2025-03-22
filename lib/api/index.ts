/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { API_URL } from "../constant";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    throw new Error("User is not authenticated");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: session.user.token,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response;
}

// helper for get
export async function get(endpoint: string) {
  const res = await fetchWithAuth(endpoint);
  return res.json();
}

// helper for post
export async function post(endpoint: string, data: any) {
  const res = await fetchWithAuth(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.json();
}

// helper for put
export async function put(endpoint: string, data: any) {
  const res = await fetchWithAuth(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.json();
}

// helper for delete
export async function del(endpoint: string) {
  const res = await fetchWithAuth(endpoint, {
    method: "DELETE",
  });
  return res.json();
}
