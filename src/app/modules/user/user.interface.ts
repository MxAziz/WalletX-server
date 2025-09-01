export enum Role {
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
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    picture?: string;
    approvalStatus?: ApprovalStatus;
    isBlocked: boolean;
}
