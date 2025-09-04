import { Types } from "mongoose";

export enum Role {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT"
}

export enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export interface IUser {
  _id?: Types.ObjectId;
  fullname: string;
  phone: string;
  password: string;
  role?: Role;
  agentApproval?: boolean;
}
