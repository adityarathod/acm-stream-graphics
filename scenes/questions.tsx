import { FC, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import defaultTransition from '../util/default-transition'

import Layer from '../components/layer'
import Scene from '../components/scene'
import { BottomBarLayer } from '../components/bottom-bar'

import qrcodeDiscord from '../public/images/qrcode-discord.png'
import qrcodeEmail from '../public/images/qrcode-email.png'

interface QuestionsProps {
  onDone?: () => unknown
}

const Questions: FC<QuestionsProps> = ({ onDone }) => {
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
            <p className="text-9xl text-center">questions?</p>
          </motion.div>
        </div>
      </Layer>
      <Layer>
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={adContainer}
        >
          <div className="px-12 h-[24rem] w-full m-auto grid grid-cols-2">
            <section className="w-full h-full px-3 py-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <h1
                  className="text-4xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  ping an officer in the discord!
                </h1>
                <Image
                  src={qrcodeDiscord}
                  alt="discord qrcode"
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  acmutd.co/discord
                </h1>
              </div>
            </section>

            <section className="w-full h-full px-3 py-4 flex flex-col items-center justify-center">
              <div className="text-center">
                <h1
                  className="text-4xl block w-full self-start text-center mb-6"
                  style={{ fontFamily: 'Gilroy-Semibold' }}
                >
                  or, email us!
                </h1>
                <Image
                  src={qrcodeEmail}
                  alt="email qrcode"
                  width={300}
                  height={300}
                  className="rounded-xl"
                />
                <h1
                  className="text-4xl block w-full self-start text-center mt-6"
                  style={{ fontFamily: 'Gilroy-Semibold', color: '#75ACFF' }}
                >
                  contact@acmutd.co
                </h1>
              </div>
            </section>
          </div>
        </motion.div>
      </Layer>

      <BottomBarLayer />
    </Scene>
  )
}

export default Questions
