import { LoginProps } from "../../types";
import argon2 from "argon2";
export const loginService = ({ username, password }: LoginProps) => {
  const encodedPassword = argon2.hash(password);
  
};
