import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { SceneContainer } from '../components/scene'
import DiscordPlug from '../scenes/discord'
import SocialsPlug from '../scenes/socials'
import StreamWelcome from '../scenes/stream-welcome'

const Home: NextPage = () => {
  const [scene, setScene] = useState(0)
  const incrementScene = () => setScene(scene + 1)
  return (
    <SceneContainer>
      <Head>
        <title>Animation Test</title>
      </Head>
      {/* {scene === 0 && <StreamWelcome onDone={incrementScene} />} */}
      {/* {scene === 1 && <DiscordPlug onDone={incrementScene} />} */}
      <SocialsPlug />
    </SceneContainer>
  )
}

export default Home
