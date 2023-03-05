import { Dispatch, SetStateAction } from "react";
import { UserTypes } from "domain/data/user/user-access.types";

export const onSetVal = <T>(
  e: React.SyntheticEvent,
  f: Dispatch<SetStateAction<T>>,
  f2?: Dispatch<SetStateAction<String>>
) => {
  e.preventDefault();

  if (f2) {
    f2("");
  }
  const target = e.target as HTMLInputElement;
  const val = target.value as unknown as T;
  f(val);
};
