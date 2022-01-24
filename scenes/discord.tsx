import { FC, useEffect } from 'react'
import { LayoutGroup, motion, Transition, useAnimation } from 'framer-motion'
import { ControlsAnimationDefinition } from 'framer-motion/types/animation/types'

import Layer from '../components/layer'
import Scene from '../components/scene'

const defaultTransition: Transition = {
  type: 'tween',
  duration: 0.75,
}

const fadeToOrigin: ControlsAnimationDefinition = {
  y: 0,
  opacity: 1,
  transition: { ...defaultTransition, delay: 0.5 },
}

interface DiscordPlugProps {
  onDone?: () => unknown
}

const DiscordPlug: FC<DiscordPlugProps> = ({ onDone }) => {
  const title = useAnimation()
  const adContainer = useAnimation()

  const animSequence = async () => {
    await title.start({
      opacity: 1,
      transition: { ...defaultTransition, delay: 1 },
    })
    await Promise.allSettled([
      title.start({
        scale: 0.75,
        y: -370,
        transition: { ...defaultTransition, delay: 3 },
      }),
      adContainer.start({
        y: 0,
        opacity: 1,
        transition: { ...defaultTransition, delay: 3.25, duration: 0.5 },
      }),
    ])
    await Promise.allSettled([
      title.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
      }),
      adContainer.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
      }),
    ])
    if (onDone) onDone()
  }

  useEffect(() => {
    animSequence()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Scene background="#303030">
      <Layer>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <motion.div
            className="text-9xl"
            style={{
              fontFamily: 'Gilroy-Bold',
            }}
            initial={{ opacity: 0 }}
            animate={title}
          >
            <p className="text-9xl text-center">join the acm discord!</p>
            <p
              className="text-6xl text-center mt-6"
              style={{ color: '#75ACFF' }}
            >
              acmutd.co/discord
            </p>
          </motion.div>
        </div>
      </Layer>
      <Layer>
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={adContainer}
        >
          <div className="px-12 h-80 w-full grid grid-cols-3">
            <section className="w-full h-full px-3 py-4 border-r-2 border-r-white flex flex-col items-center justify-center">
              <div>
                <h1
                  className="text-5xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  community
                </h1>
                <div className="px-4 text-center text-3xl leading-loose">
                  <p>
                    connect with other UTD students and discuss classes,
                    interests, and more!
                  </p>
                  <p>
                    we have{' '}
                    <span style={{ fontFamily: 'Gilroy-Semibold' }}>2,800</span>{' '}
                    members and counting.
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full h-full px-3 py-4 border-r-2 border-r-white flex flex-col items-center justify-center">
              <div>
                <h1
                  className="text-5xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  event discovery
                </h1>

                <div className="px-4 text-center text-3xl leading-loose">
                  <p>
                    discover dozens of events hosted by ACM and our partner
                    organizations!
                  </p>
                  <p>&nbsp;</p>
                </div>
              </div>
            </section>

            <section className="w-full h-full px-3 py-4 flex flex-col items-center justify-center">
              <div>
                <h1
                  className="text-5xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  circles
                </h1>
                <div className="px-4 text-center text-3xl leading-loose">
                  <p>
                    circles are smaller interest groups designed by the
                    community!
                  </p>
                  <p>
                    from{' '}
                    <span style={{ fontFamily: 'Gilroy-SemiBold' }}>
                      internship hunting
                    </span>{' '}
                    to{' '}
                    <span style={{ fontFamily: 'Gilroy-SemiBold' }}>anime</span>
                    !
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </Layer>
      <Layer className="flex flex-col items-center justify-end">
        <motion.div
          className="px-12 py-8 flex flex-row items-center w-full text-4xl"
          style={{
            fontFamily: 'Gilroy-Semibold',
          }}
        >
          <div>acm spring 2022 kickoff.</div>
          <div style={{ color: '#75ACFF' }}>&nbsp;starts soon.</div>
          <div className="flex-1"></div>
        </motion.div>
      </Layer>
    </Scene>
  )
}

export default DiscordPlug
