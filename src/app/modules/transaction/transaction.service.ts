import mongoose, { isValidObjectId } from "mongoose";
import { Transaction } from "./transaction.model";



const myTransactions = async ( userId: string, query: Record<string, string>) => {

    const currentUserId = new mongoose.Types.ObjectId(userId);

    const filter: any = {
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    };
    if (query.type) filter.type = query.type;

    if (query.from && query.to) {
        let start = new Date(query.from);
        start.setHours(0, 0, 0, 0);

        let end = new Date(query.to);
        end.setHours(23, 59, 59, 999);
        filter.createdAt = { $gte: start, $lte: end };
    }

    const sort = query.sort || "-createdAt";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * Number(limit);

    const transactions = await Transaction.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    for (const tx of transactions) {
        if (isValidObjectId(tx.sender))
        await tx.populate("sender", "fullname phone role");
        if (isValidObjectId(tx.receiver))
        await tx.populate("receiver", "fullname phone role");
    }

    const total = await Transaction.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
        data: transactions,
        meta: {
        total,
        limit,
        page,
        totalPages,
        },
    };
};


export const transactionService = {
  myTransactions,
};