import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// 둘 중 하나나
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await fetch(`https://learn.codeit.kr/api/codeitmall/products/${id}`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ error: "Product not found" });
  }
}

export default handler;