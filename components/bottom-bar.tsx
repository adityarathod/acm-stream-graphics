import { FC } from 'react'
import useSWR from 'swr'
import Layer from './layer'

interface BottombarProps {
  hidden?: boolean
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const BottomBar: FC<BottombarProps> = () => {
  const { data, error } = useSWR<{ trackName: string }>(
    `/api/now-playing`,
    fetcher,
    { refreshInterval: 500 },
  )
  return (
    <div
      className="px-12 py-8 flex flex-row items-center w-full text-4xl"
      style={{
        fontFamily: 'Gilroy-Semibold',
      }}
    >
      <div>acm spring 2022 kickoff.</div>
      <div style={{ color: '#75ACFF' }}>&nbsp;starts soon.</div>
      <div className="flex-1"></div>
      <div className="text-gray-300">
        <p className="text-xl text-right">♫ now playing</p>
        <p className="text-2xl">{data?.trackName}</p>
      </div>
    </div>
  )
}

export const BottomBarLayer: FC<BottombarProps> = (props) => {
  return (
    <Layer className="flex flex-col items-center justify-end">
      <BottomBar {...props} />
    </Layer>
  )
}

export default BottomBar
