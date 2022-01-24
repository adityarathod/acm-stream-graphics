import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { SceneContainer } from '../components/scene'
import DiscordPlug from '../scenes/discord'
import SocialsPlug from '../scenes/socials'
import Questions from '../scenes/questions'
import StreamWelcome from '../scenes/stream-welcome'
import Giveaway from '../scenes/giveaway'
import MemberExp from '../scenes/member-exp'
import Waiting from '../scenes/waiting'
import Countdown from '../scenes/countdown'
import EndCard from '../scenes/end-card'

import useSWR from 'swr'
import fetcher from '../util/fetcher'

const Home: NextPage = () => {
  const [scene, setScene] = useState(0)
  const [curSceneGroup, setSceneGroup] = useState('prestream')
  const incrementScene = () => setScene(scene + 1)
  const { data } = useSWR<{ sceneGroup: string }>(`/api/scene-group`, fetcher, {
    refreshInterval: 10,
  })

  useEffect(() => {
    setScene(0)
    setSceneGroup(data?.sceneGroup || 'prestream')
  }, [data])

  const sceneGroups: { [key: string]: JSX.Element[] } = {
    prestream: [
      <StreamWelcome key="welcome" onDone={incrementScene} />,
      <DiscordPlug key="discord" onDone={incrementScene} />,
      <SocialsPlug key="socials" onDone={incrementScene} />,
      <Questions key="questions" onDone={incrementScene} />,
      <Giveaway key="giveaway" onDone={incrementScene} />,
      <MemberExp key="member-exp" onDone={incrementScene} />,
      <Waiting key="waiting" onDone={() => setScene(0)} />,
    ],
    countdown: [<Countdown key="countdown" />],
    poststream: [<EndCard />],
  }

  return (
    <SceneContainer>
      <Head>
        <title>Animation Test</title>
      </Head>
      {sceneGroups[curSceneGroup][scene]}
      {/* {scene === 0 && <StreamWelcome onDone={incrementScene} />}
      {scene === 1 && <DiscordPlug onDone={incrementScene} />}
      {scene === 2 && <SocialsPlug onDone={incrementScene} />}
      {scene === 3 && <Questions />} */}
      {/* <SocialsPlug /> */}
      {/* <Questions /> */}
      {/* <Giveaway /> */}
      {/* <MemberExp /> */}
      {/* <Waiting /> */}
    </SceneContainer>
  )
}

export default Home
