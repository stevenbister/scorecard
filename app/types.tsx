export interface Errors {
  errors: {
    email?: string;
    password?: string;
  };
}

export interface UserProfile {
  id: FormDataEntryValue | string;
  email: FormDataEntryValue | string;
  name: FormDataEntryValue | string | null; // We'll allow people to not have a name
}

export type Status = "PENDING" | "SUCCESS" | "ERROR";
