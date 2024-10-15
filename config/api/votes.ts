// pages/api/votes.ts
import { NextApiRequest, NextApiResponse } from 'next';

type Vote = {
  id: string;
  title: string;
  options: string[];
};

// const votes: Vote[] = [];

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     res.status(200).json(votes);
//   } else if (req.method === 'POST') {
//     const { title, options } = req.body;
//     const newVote = { id: String(votes.length + 1), title, options };
//     votes.push(newVote);
//     res.status(201).json(newVote);
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
import React from 'react'

export default function votes() {
  return (
    <div>votes</div>
  )
}
