import { FC } from 'react'
import classNames from 'classnames'

import useSWR, { useSWRConfig } from 'swr'
import fetcher from '../util/fetcher'

const trackList = [
  'nothing (yet)',
  'twenty-three – iu',
  'jam & butterfly – dpr live',
  'tamed-dashed – enhypen',
  'polaroid love – enhypen',
  'the feels – twice',
  'dm – fromis_9',
  'better – twice',
  'blessed-cursed – enhypen',
  'blue hour – txt',
]

type Data = {
  trackName: string
}

const NowPlayingControl: FC = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<Data>(`/api/now-playing`, fetcher, {
    refreshInterval: 500,
  })

  const submit = async (trackName: string) => {
    const payload = { trackName }
    await fetch('/api/now-playing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    mutate('/api/now-playing')
  }

  return (
    <section className="py-8">
      <h2 className="mb-8 font-semibold text-4xl">Now Playing Indicator</h2>
      <div className="mx-auto flex flex-row items-center flex-wrap">
        {trackList.map((track, idx) => (
          <button
            key={idx}
            className={classNames(
              'w-36 h-36 p-2 flex items-center justify-center text-xl text-white m-1',
              data && data.trackName === track ? 'bg-gray-700' : 'bg-blue-600',
            )}
            onClick={() => submit(track)}
            disabled={data && data.trackName === track}
          >
            {track.split('–')[0] || ''}
            <br />
            {track.split('–')[1] || ''}
          </button>
        ))}
      </div>
    </section>
  )
}

export default NowPlayingControl
