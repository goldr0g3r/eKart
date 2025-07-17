import { UUID } from "crypto";

export interface User {
  id: UUID;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}
