import { MongoClient } from "mongodb";

export const getClient = async () => {
  let client;
  try {
    client = await MongoClient.connect(
      "mongodb+srv://codepillbot:Cozonac43%40@cluster0.a2ftxtg.mongodb.net/patient-manager?retryWrites=true&w=majority"
    );
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
};
