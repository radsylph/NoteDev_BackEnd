import { Request, Response } from "express";

const test = async (req: Request, res: Response) => {
  await res.send("funciona");
};

export { test };
