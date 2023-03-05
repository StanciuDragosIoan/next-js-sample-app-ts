import { Companies } from "../contract/contract-utils";
import { UserTypes } from "../user/user-access.types";

export enum CancerStages {
  zero = "0",
  one = "1",
  two = "2",
  three = "3",
}

export type UserPatient = {
  age: string;
  company: Companies;
  firstName: string;
  lastName: string;
  stage: CancerStages;
  userType: UserTypes;
  _id: string;
};
