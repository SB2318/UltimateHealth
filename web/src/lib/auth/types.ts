/** Shapes exchanged with the `/user/*` endpoints. */

export interface AuthUser {
  _id?: string;
  user_name?: string;
  user_handle?: string;
  email?: string;
  isDoctor?: boolean;
  Profile_image?: string;
  contact_detail?: string;
  qualification?: string;
  specialization?: string;
  Years_of_experience?: number;
  [key: string]: unknown;
}

export interface AuthSession {
  user: AuthUser | null;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * `/user/register` requires the doctor fields only when `isDoctor` is true, and
 * `contact_detail` is optional for regular users but required for doctors.
 */
export interface RegisterPayload {
  user_name: string;
  user_handle: string;
  email: string;
  password: string;
  isDoctor: boolean;
  Profile_image?: string;
  contact_detail?: string;
  qualification?: string;
  specialization?: string;
  Years_of_experience?: number;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

/** Never `authenticated` until the session has actually been checked. */
export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser | null>;
  register: (payload: RegisterPayload) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<string>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<string>;
  refresh: () => Promise<void>;
}

/** Thrown by the service layer so callers get a message worth displaying. */
export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}
