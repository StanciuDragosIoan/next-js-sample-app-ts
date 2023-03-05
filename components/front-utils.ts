type Data = {
  age?: String;
  stage?: String;
  userId?: String;
  price?: Number | String;
  product?: String;
  duration?: Number | String;
  userCompany?: String;
  installment?: Number | String;
  contractId?: String;
  email?: String;
  password?: String;
};

export const dataFetcher = async (
  url: string,
  method?: string,
  data?: Data
) => {
  if (!method && !data) {
    const res = await fetch(url);
    const resData = await res.json();
    return resData;
  } else {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    return resData;
  }
};
