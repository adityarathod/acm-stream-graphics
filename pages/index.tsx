import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { SceneContainer } from '../components/scene'
import DiscordPlug from '../scenes/discord'
import SocialsPlug from '../scenes/socials'
import Questions from '../scenes/questions'
import StreamWelcome from '../scenes/stream-welcome'

const Home: NextPage = () => {
  const [scene, setScene] = useState(0)
  const incrementScene = () => setScene(scene + 1)
  const scenes = [
    <StreamWelcome key="welcome" onDone={incrementScene} />,
    <DiscordPlug key="discord" onDone={incrementScene} />,
    <SocialsPlug key="socials" onDone={incrementScene} />,
    <Questions key="questions" onDone={() => setScene(0)} />,
  ]
  return (
    <SceneContainer>
      <Head>
        <title>Animation Test</title>
      </Head>
      {scenes[scene]}
      {/* {scene === 0 && <StreamWelcome onDone={incrementScene} />}
      {scene === 1 && <DiscordPlug onDone={incrementScene} />}
      {scene === 2 && <SocialsPlug onDone={incrementScene} />}
      {scene === 3 && <Questions />} */}
      {/* <SocialsPlug /> */}
      {/* <Questions /> */}
    </SceneContainer>
  )
}

export default Home
