export interface Errors {
  errors: {
    email?: string;
    password?: string;
  };
}

export type Status = "PENDING" | "SUCCESS" | "ERROR";
