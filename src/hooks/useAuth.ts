"use client";

import { useState, useCallback, useEffect } from "react";
import { authAPI, adminAPI } from "@/services/api";
import type { LoginResponse, AuthContextType } from "@/utils/types";

export const useAuth = (): AuthContextType => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      setToken(storedToken);
      setIsHydrated(true);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authAPI.login(email, password);

        if (response && typeof response === "object" && "token" in response) {
          const loginResponse = response as LoginResponse;
          setToken(loginResponse.token);
          localStorage.setItem("authToken", loginResponse.token);
          return loginResponse;
        } else {
          throw new Error("Invalid response format: missing token");
        }
      } catch (err: unknown) {
        let message = "Login failed";
        if (err instanceof Error) {
          message = err.message;
        } else if (
          typeof err === "object" &&
          err !== null &&
          "message" in err
        ) {
          message = String((err as Record<string, unknown>).message);
        }
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    if (token) {
      try {
        await adminAPI.logout(token);
      } catch (err) {
        console.log("[v0] Logout API error:", err);
      }
    }
    setToken(null);
    localStorage.removeItem("authToken");
  }, [token]);

  return { token, isLoading, error, login, logout, isHydrated: isHydrated };
};
