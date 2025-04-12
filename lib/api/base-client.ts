/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { API_URL } from "../constant";

// Token Header Configuration
type TokenType = "Bearer";

const getAuthorizationHeader = (
  tokenType: TokenType = "Bearer",
  token?: string
): string => {
  return token ? `${tokenType} ${token}` : "";
};

// Configure Request Headers
const configureHeaders = ({
  contentType = "application/json",
  tokenType = "Bearer",
  token = undefined,
  isFileUpload = false,
}: {
  contentType?: string;
  tokenType?: TokenType;
  token?: string;
  isFileUpload?: boolean;
} = {}) => {
  const headers = new Headers();

  // Set content type only if it's not a file upload
  if (!isFileUpload) {
    headers.append("Content-Type", contentType);
  }

  headers.append("Accept", "application/json");

  const authHeader = getAuthorizationHeader(tokenType, token);
  if (authHeader) {
    headers.append("Authorization", authHeader);
  }

  return headers;
};

// Fetcher for SWR
const fetcher = async (
  url: string,
  options: RequestInit = {},
  responseType: "json" | "blob" = "json"
) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `API error: ${response.status}`,
    }));
    throw new Error(error.message || `Failed to fetch: ${response.statusText}`);
  }

  return responseType === "blob" ? response.blob() : response.json();
};

// Custom Hook for SWR
export const useApiData = (
  endpoint: string,
  options: {
    method?: string;
    contentType?: string;
    tokenType?: TokenType;
    token?: string;
    isFileUpload?: boolean;
    body?: any;
    responseType?: "json" | "blob";
    shouldFetch?: boolean;
  } = {}
) => {
  const { data: session, status } = useSession();
  const {
    method = "GET",
    contentType = "application/json",
    tokenType = "Bearer",
    token: providedToken,
    isFileUpload = false,
    body,
    responseType = "json",
    shouldFetch = true,
  } = options;

  const token = providedToken || session?.user?.token;
  const headers = configureHeaders({
    contentType,
    tokenType,
    token,
    isFileUpload,
  });

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const cacheKey = token ? [endpoint, token, responseType] : null;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch && cacheKey ? cacheKey : null,
    ([url, token, responseType]: [string, string, "json" | "blob"]) =>
      fetcher(`${API_URL}${url}`, config, responseType)
    // {
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: true,
    //   dedupingInterval: 2000,
    //   revalidateOnMount: !token || !!cacheKey,
    //   refreshInterval: 0,
    //   keepPreviousData: true,
    // }
  );

  return {
    data,
    error,
    isLoading: isLoading || status === "loading",
    isAuthenticated: status === "authenticated",
    mutate,
  };
};

// Service Factory
export const createApiService = (baseUrl: string) => ({
  get: (
    endpoint: string,
    params?: Record<string, string>,
    responseType: "json" | "blob" = "json",
    options: {
      contentType?: string;
      tokenType?: TokenType;
      token?: string;
    } = {}
  ) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return useApiData(`${endpoint}${query}`, { ...options, responseType });
  },
  post: (
    endpoint: string,
    data: any,
    isFileUpload = false,
    options: {
      contentType?: string;
      tokenType?: TokenType;
      token?: string;
    } = {}
  ) =>
    useApiData(endpoint, {
      ...options,
      method: "POST",
      body: data,
      isFileUpload,
    }),
  put: (
    endpoint: string,
    data: any,
    options: {
      contentType?: string;
      tokenType?: TokenType;
      token?: string;
    } = {}
  ) =>
    useApiData(endpoint, {
      ...options,
      method: "PUT",
      body: data,
    }),
  del: (
    endpoint: string,
    options: {
      contentType?: string;
      tokenType?: TokenType;
      token?: string;
    } = {}
  ) =>
    useApiData(endpoint, {
      ...options,
      method: "DELETE",
    }),
});
