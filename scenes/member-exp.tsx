import { FC, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import defaultTransition from '../util/default-transition'

import Layer from '../components/layer'
import Scene from '../components/scene'
import { BottomBarLayer } from '../components/bottom-bar'

import qrcode from '../public/images/qrcode-survey.png'

interface MemberExpProps {
  onDone?: () => unknown
}

const MemberExp: FC<MemberExpProps> = ({ onDone }) => {
  const title = useAnimation()
  const subtitle = useAnimation()
  const code = useAnimation()

  const animSequence = async () => {
    await Promise.allSettled([
      title.start({
        opacity: 1,
        y: 0,
        transition: { ...defaultTransition, delay: 1 },
      }),
      subtitle.start({
        opacity: 1,
        y: 0,
        transition: { ...defaultTransition, delay: 1.05 },
      }),
      code.start({
        opacity: 1,
        y: 0,
        transition: { ...defaultTransition, delay: 1.1 },
      }),
    ])
    await Promise.allSettled([
      title.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
      }),
      subtitle.start({
        opacity: 0,
        transition: { ...defaultTransition, delay: 10, duration: 0.5 },
      }),
      code.start({
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
        <motion.h1
          className="text-[10rem] leading-[0.9] block absolute top-[8rem] left-[12rem] tracking-normal"
          style={{ fontFamily: 'Gilroy-Bold' }}
          initial={{ y: 50, opacity: 0 }}
          animate={title}
        >
          the <span className="text-[#75ACFF]">acm member</span>
          <br />
          &emsp;experience survey.
        </motion.h1>
        <motion.h2
          className="block absolute w-full top-[35rem] left-[60rem] text-4xl leading-relaxed"
          style={{ fontFamily: 'Gilroy-Semibold' }}
          initial={{ y: 50, opacity: 0 }}
          animate={subtitle}
        >
          we&apos;d love to get your feedback!
          <br />
          get the chance to win a $20 Amazon gift card
          <br />
          and register your interest for the new ACM shirt.
          <br />
          <span className="block mt-4 text-[#75ACFF]">
            portal.acmutd.co/forms/experience
          </span>
        </motion.h2>
      </Layer>
      <Layer>
        <motion.div
          className="absolute top-[32rem] left-[17rem]"
          initial={{ y: 50, opacity: 0 }}
          animate={code}
        >
          <Image
            src={qrcode}
            className="rounded-xl"
            width={400}
            height={400}
            alt="qr code survey"
          />
        </motion.div>
      </Layer>

      <BottomBarLayer />
    </Scene>
  )
}

export default MemberExp
