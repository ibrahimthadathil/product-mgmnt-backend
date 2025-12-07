import { Response } from "express";

export const setCookie = (res: Response, type: string, token: string) => {
  console.log("problem not found");
  res.cookie(type, token, {
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  console.log("problem  found");
};