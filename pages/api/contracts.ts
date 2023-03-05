// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getClient } from "utils/db/dbUtils";

type Data = {
  msg: string;
  contracts?: any[];
  updatedId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = await getClient();
  if (req.method === "POST") {
    const { price, product, duration, userCompany, installment } = req.body;

    const newContract = {
      price,
      product,
      duration,
      contractParties: [userCompany],
      userCompany,
      installment,
      status: "open", //"open" or "matched"
    };
    try {
      if (client) {
        const db = client.db();
        await db.collection("contracts").insertOne(newContract);
        client.close();
        res.status(201).json({ msg: "Contract Saved Successfully" });
        return;
      }
    } catch (err) {
      res.status(500).json({ msg: "Some error occurred" });
      return;
    }
  } else if (req.method === "GET") {
    try {
      if (client) {
        const db = client.db();
        const contractsData = await db
          .collection("contracts")
          .find({ status: "open" })
          .toArray();
        client.close();
        res.status(200).json({
          msg: "Contracts retrieved successfully",
          contracts: contractsData,
        });
        return;
      }
    } catch (err) {
      res.status(500).json({ msg: "Some error occurred" });
      return;
    }
  } else if (req.method === "PUT") {
    const { id, product, duration, price } = req.body;
    try {
      if (client) {
        const db = client.db();
        const contractToUpdate = await db
          .collection("contracts")
          .findOne({ _id: new ObjectId(id) });

        await db.collection("contracts").updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              contractParties: contractToUpdate!.contractParties,
              product,
              duration,
              price,
              userCompany: contractToUpdate!.userCompany,
              status: contractToUpdate!.status,
              installment: (
                contractToUpdate!.price / contractToUpdate!.duration
              ).toFixed(2),
            },
          },
          {
            upsert: true,
          }
        );
        client.close();
        res
          .status(201)
          .json({ msg: "Contract Updated Successfully", updatedId: id });
        return;
      }
    } catch (err) {
      res.status(500).json({ msg: "Some error occurred" });
      return;
    }
  } else {
    res.status(405).json({ msg: "Method not allowed" });
    return;
  }
}
