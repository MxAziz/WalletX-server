import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ITransaction } from "../transaction/transaction.interface";
import { User } from "../user/user.model";
import { Wallet } from "./wallet.model";
import { Role } from "../user/user.interface";


const myWallet = async (userId: string) => {
  const info = await Wallet.findOne({ owner: userId }).populate(
    "owner",
    "fullname phone role agentApproval"
  );
  return info;
};

const addMoney = async (payload: Partial<ITransaction>) => {

  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });
  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }

  if (sender.role !== Role.AGENT) {
    throw new AppError(StatusCodes.FORBIDDEN, `Sender must be an Agent.`);
  }

  if (!sender.agentApproval) {
    throw new AppError(StatusCodes.FORBIDDEN, `Agent has been suspended`);
  }

  const transactionInfo = await Wallet.addMoney(
    sender._id,
    receiver._id,
    payload.amount as number
  );

  return transactionInfo;
};

const withdrawMoney = async (payload: Partial<ITransaction>) => {
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });

  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }

  if (receiver.role !== Role.AGENT) {
    throw new AppError(StatusCodes.FORBIDDEN, `Receiver must be an Agent.`);
  }

  if (!receiver.agentApproval) {
    throw new AppError(StatusCodes.FORBIDDEN, `Agent has been suspended`);
  }

  const transactionInfo = await Wallet.withdrawMoney(
    sender._id,
    receiver._id,
    payload.amount as number
  );

  return transactionInfo;
};




export const walletServices = {
  myWallet,
  addMoney,
  withdrawMoney,
}