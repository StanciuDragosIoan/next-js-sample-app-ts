// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "utils/db/dbUtils";
import bcrypt from "bcrypt";

const companyNames = ["abcMed.LTD", "cdefMed.LTD", "fqjxMed.LTD"];

const getCompany = () => {
  return companyNames[Math.floor(Math.random() * companyNames.length)];
};
type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var client = await getClient();
  if (req.method === "POST") {
    const { firstName, lastName, email, password, userType, age } = req.body;

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const newUser = {
      firstName,
      lastName,
      email,
      hashedPass,
      userType,
      age,
      company: getCompany(),
    };

    try {
      if (client) {
        const db = client.db();

        const isUser = await db.collection("users").findOne({ email });

        if (isUser) {
          res.status(400).json({ msg: "Bad Request!" });
          return;
        } else {
          await db.collection("users").insertOne(newUser);
          client.close();
          res.status(200).json({ msg: "User Saved Successfully" });
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
