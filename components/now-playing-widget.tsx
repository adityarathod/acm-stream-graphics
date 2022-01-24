import { FC } from 'react'
import useSWR from 'swr'
import fetcher from '../util/fetcher'

const NowPlayingWidget: FC = () => {
  const { data, error } = useSWR<{ trackName: string }>(
    `/api/now-playing`,
    fetcher,
    { refreshInterval: 500 },
  )

  return (
    <div className="text-gray-300">
      <p className="text-xl text-right">♫ now playing</p>
      <p className="text-2xl">{data?.trackName || 'nothing (yet)'}</p>
    </div>
  )
}

export default NowPlayingWidget
