import classNames from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'
import NowPlayingControl from '../components/now-playing-control'
import SceneGroupControl from '../components/scene-group-control'

const Dashboard: NextPage = () => {
  const phases = ['prestream', 'poststream']

  return (
    <main>
      <Head>
        <title>Stream Graphics Dashboard</title>
      </Head>
      <div className="mx-auto max-w-5xl px-2 py-4 mt-8 text-black system">
        <h1 className="text-5xl mb-4 font-bold text-center">
          Stream Graphics Dashboard
        </h1>
        <NowPlayingControl />
        <SceneGroupControl />
      </div>
    </main>
  )
}

export default Dashboard
