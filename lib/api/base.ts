/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { API_URL } from "../constant";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
  responseType?: "json" | "blob";
}

export async function fetchWithAuth(endpoint: string, options: FetchOptions) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    return { success: false, message: "No authentication token found" };
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: session.user.token,
        Accept: "application/json",
        ...options.headers,
      },
    });

    console.log("Request:", endpoint, options);

    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        message: `API error: ${response.status}`,
      }));
      return { success: false, ...errorResponse };
    }

    return {
      success: true,
      data:
        options.responseType === "blob"
          ? await response.blob()
          : await response.json(),
      message: response.status,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "Network error or API is unreachable" };
  }
}

const createRequest =
  (method: string) =>
  async (
    endpoint: string,
    data?: any,
    headers: Record<string, string> = {},
    responseType: "json" | "blob" = "json"
  ) => {
    const options: FetchOptions = { method, headers, responseType };

    if (data && method !== "GET") {
      options.body = data instanceof FormData ? data : JSON.stringify(data);
      if (!(data instanceof FormData) && !headers["Content-Type"]) {
        options.headers = {
          "Content-Type": "application/json",
          ...headers,
        };
      }
    }

    const response = await fetchWithAuth(endpoint, options);

    if (!response.success) {
      throw new Error(response.message || "Request failed");
    }

    return response.data;
  };

export const get = (endpoint: string, responseType: "json" | "blob" = "json") =>
  createRequest("GET")(endpoint, undefined, {}, responseType);
export const post = createRequest("POST");
export const put = createRequest("PUT");
export const del = createRequest("DELETE");
