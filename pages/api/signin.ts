// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "utils/db/dbUtils";
import bcrypt from "bcrypt";

type Data = {
  msg: string;
  userId?: string;
  mail?: string;
  type?: string;
  company?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = await getClient();
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      if (client) {
        const db = client.db();
        const isUser = await db.collection("users").findOne({ email });
        if (isUser) {
          const { hashedPass } = isUser;

          const isUserLegit = await bcrypt.compare(password, hashedPass);

          if (isUserLegit) {
            res.status(200).json({
              msg: "Access granted",
              userId: isUser._id.toString(),
              mail: isUser.email,
              type: isUser.userType,
              company: isUser.company,
            });
            return;
          } else {
            res.status(400).json({ msg: "Bad Request!" });
            return;
          }
        } else {
          res.status(500).json({ msg: "Bad credentials" });
          return;
        }
      }
    } catch (err) {
      res.status(500).json({ msg: "Some error occurred" });
      return;
    }
  } else {
    res.status(405).json({ msg: "Method Not Allowed, go away X__X!" });
  }
}
