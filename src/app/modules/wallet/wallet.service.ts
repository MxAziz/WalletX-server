import { Wallet } from "./wallet.model";


const myWallet = async (userId: string) => {
  const info = await Wallet.findOne({ owner: userId }).populate(
    "owner",
    "fullname phone role agentApproval"
  );
  return info;
};





export const walletServices = {
    myWallet,
}