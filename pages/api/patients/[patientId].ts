// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "utils/db/dbUtils";
type Data = {
  msg: string;
  userId?: string;
  mail?: string;
  type?: string;
  company?: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { patientId } = req.query;

    const client = await getClient();

    if (client && patientId !== undefined && !Array.isArray(patientId)) {
      const db = client.db();

      try {
        const userData = await db
          .collection("users")
          .findOne({ _id: new ObjectId(patientId) });

        const userResData = {
          firstName: userData!.firstName,
          lastName: userData!.lastName,
          email: userData!.email,
          age: userData!.age ? userData!.age : "",
          stage: userData!.stage ? userData!.stage : "",
        };
        res.status(200).json({ msg: "Data fetched", user: userResData });
        return;
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Data fetched" });
        return;
      }
    }
  } else {
    res.status(405).json({ msg: "Method not allowed" });
    return;
  }
}
