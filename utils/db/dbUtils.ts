import { MongoClient } from "mongodb";

export const getClient = async () => {
  let client;
  try {
    client = await MongoClient.connect(`${process.env.mongoString}`);
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
};
