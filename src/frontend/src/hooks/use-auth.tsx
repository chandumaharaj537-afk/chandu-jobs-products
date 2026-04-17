import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: string | null;
  identity: Identity | null;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { loginStatus, identity, login, clear, isAuthenticated } =
    useInternetIdentity();

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";
  const principal =
    isAuthenticated && identity ? identity.getPrincipal().toText() : null;

  return {
    isAuthenticated,
    isLoading,
    principal,
    identity: identity ?? null,
    login,
    logout: clear,
  };
}
