// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  trackName: string
}

let trackName = 'nothing (yet)'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST' && req.body) {
    trackName = req.body.trackName
    res.status(200).json({ trackName })
  } else {
    res.status(200).json({ trackName })
  }
}
