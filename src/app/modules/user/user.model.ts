import { model, Schema } from "mongoose";
import { ApprovalStatus, IUser, Role } from "./user.interface";

// add model : name, email, phone ,password , role , picture, approvalStatus, isBlocked
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    picture: { type: String },
    approvalStatus: {
      type: String,
      enum: Object.values(ApprovalStatus),
      default: ApprovalStatus.PENDING,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
