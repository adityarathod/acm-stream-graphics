import { FC } from 'react'
import Layer from './layer'
import NowPlayingWidget from './now-playing-widget'

interface BottombarProps {
  hidden?: boolean
}

const BottomBar: FC<BottombarProps> = () => {
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
      <NowPlayingWidget />
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
