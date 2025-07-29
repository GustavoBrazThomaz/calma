import type { UseMutationResult } from "@tanstack/react-query";
import { vi } from "vitest";

export function createMutationMock<
  TData = unknown,
  TError = unknown,
  TVariables = void
>(): UseMutationResult<TData, TError, TVariables, unknown> {
  return {
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    data: null as TData,
    error: null as TError,
    variables: null as TVariables,
    isError: false,
    isIdle: false,
    isPending: false,
    isPaused: false,
    isSuccess: true,
    status: "success",
    failureCount: 0,
    failureReason: null,
    context: undefined,
    reset: vi.fn(),
  } as unknown as UseMutationResult<TData, TError, TVariables, unknown>;
}
