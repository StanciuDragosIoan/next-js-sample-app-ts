// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import { getClient } from "utils/db/dbUtils";

type Data = {
  msg: string;
  userId?: string;
  mail?: string;
  type?: string;
  company?: string;
  users?: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = await getClient();
  if (req.method === "PUT") {
    const { age, stage, userId } = req.body;
    if (client) {
      try {
        const db = client.db();
        const userToUpdate = await db
          .collection("users")
          .findOne({ _id: new ObjectId(userId) });
        await db.collection("users").updateOne(
          { _id: new ObjectId(userId) },
          {
            $set: {
              firstName: userToUpdate!.firstName,
              lastName: userToUpdate!.lastName,
              email: userToUpdate!.email,
              hashedPass: userToUpdate!.hashedPass,
              userType: userToUpdate!.userType,
              company: userToUpdate!.company,
              age,
              stage,
            },
          },
          {
            upsert: true,
          }
        );
        client.close();
        res.status(201).json({ msg: "user updated" });
        return;
      } catch (err) {
        res.status(500).json({ msg: "some err occurred" });
        return;
      }
    }
  } else if (req.method === "PATCH") {
    const { userId, contractId } = req.body;

    const client = await getClient();

    if (client) {
      const db = client.db();

      const contractToUpdate = await db
        .collection("contracts")
        .findOne({ _id: new ObjectId(contractId) });

      const userToUpdate = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });

      if (contractToUpdate && userToUpdate) {
        //update contract
        await db.collection("contracts").updateOne(
          { _id: new ObjectId(contractId) },
          {
            $set: {
              price: contractToUpdate.price,
              product: contractToUpdate.product,
              duration: contractToUpdate.duration,
              contractParties: [
                ...contractToUpdate.contractParties,
                `${userToUpdate.firstName}_${userToUpdate.lastName}`,
              ],
              userCompany: contractToUpdate.userCompany,
              status: "matched",
            },
          },
          {
            upsert: true,
          }
        );

        res.status(200).json({ msg: "contract updated" });
      }
    }

    return;
  } else if (req.method === "GET") {
    const client = await getClient();
    if (client) {
      const db = client.db();
      const data = await db
        .collection("users")
        .find({ userType: "patient", age: { $lt: "55", $gt: "0" } })
        .toArray();

      const outputData = data.map((i) => ({
        age: i.age,
        company: i.company,
        email: i.email,
        firstName: i.firstName,
        lastName: i.lastName,
        stage: i.stage,
        userType: i.userType,
        _id: i._id,
      }));

      res.status(200).json({ msg: "data fetched", users: outputData });
    }
    return;
  } else {
    res.status(405).json({ msg: "Method not allowed" });
    return;
  }
}
