import type { NextPage } from 'next'
import Head from 'next/head'

const Dashboard: NextPage = () => {
  const submit = async (trackName: string) => {
    const data = { trackName }
    await fetch('/api/now-playing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
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

  return (
    <main>
      <Head>
        <title>Animation Dashboard!</title>
      </Head>
      <div className="mx-auto max-w-4xl px-2 py-4 mt-8 text-center text-black system">
        <h1 className="text-5xl mb-12 text-bold">Animation Dashboard</h1>
        <div className="leading-relaxed">
          {trackList.map((track, idx) => (
            <button
              key={idx}
              className="bg-blue-300 py-1 px-2 rounded-full mr-4 my-1"
              onClick={() => submit(track)}
            >
              {track}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Dashboard
