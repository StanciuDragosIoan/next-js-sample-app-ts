export enum Companies {
  abcMed = "abcMed.LTD",
  cdefMed = "cdefMed.LTD",
  fqjxMed = "fqjxMed.LTD",
}

export enum Products {
  abc10 = "abc10",
  abc20 = "abc20",
}

export enum ContractStatus {
  open = "open",
  matched = "matched",
}

export enum pricesAbc10 {
  min = "1000",
  avg = "1800",
  max = "2500",
}

export enum pricesAbc20 {
  min = "1500",
  avg = "2700",
  max = "4100",
}

export enum contractDuration {
  nine = "9",
  twelve = "12",
}

export type Contract = {
  _id: string;
  contratParties: string[];
  duration: contractDuration;
  installment: string;
  price: pricesAbc10 | pricesAbc20;
  product: Products;
  status: ContractStatus;
  userCompany: Companies;
};
