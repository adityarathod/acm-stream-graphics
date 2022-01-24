import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  sceneGroup: string
}

let sceneGroup = 'prestream'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST' && req.body) {
    sceneGroup = req.body.sceneGroup
    res.status(200).json({ sceneGroup })
  } else {
    res.status(200).json({ sceneGroup })
  }
}
