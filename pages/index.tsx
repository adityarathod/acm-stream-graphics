import type { NextPage } from 'next'
import Head from 'next/head'
import { SceneContainer } from '../components/scene'
import StreamWelcome from '../scenes/stream-welcome'

const Home: NextPage = () => {
  return (
    <SceneContainer>
      <Head>
        <title>Animation Test</title>
      </Head>
      <StreamWelcome />
    </SceneContainer>
  )
}

export default Home
