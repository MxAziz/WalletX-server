import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    agentApproval: { type: Boolean, default: undefined },
  },
  { timestamps: true }
);


export const User = model<IUser>("User", userSchema);
