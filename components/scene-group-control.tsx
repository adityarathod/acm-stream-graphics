import { FC } from 'react'
import classNames from 'classnames'

import useSWR, { useSWRConfig } from 'swr'
import fetcher from '../util/fetcher'

const groups = ['prestream', 'countdown', 'poststream']

type Data = {
  sceneGroup: string
}

const SceneGroupControl: FC = () => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<Data>(`/api/scene-group`, fetcher, {
    refreshInterval: 500,
  })

  const submit = async (sceneGroup: string) => {
    const payload = { sceneGroup }
    await fetch('/api/scene-group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    mutate('/api/scene-group')
  }

  return (
    <section className="py-8">
      <h2 className="mb-8 font-semibold text-4xl">Scene Groups</h2>
      <div className="mx-auto flex flex-row items-center flex-wrap">
        {groups.map((group, idx) => (
          <button
            key={idx}
            className={classNames(
              'w-36 h-36 p-2 flex items-center justify-center text-xl text-white m-1',
              data && data.sceneGroup === group
                ? 'bg-gray-700'
                : 'bg-indigo-500',
            )}
            onClick={() => submit(group)}
            disabled={data && data.sceneGroup === group}
          >
            {group}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SceneGroupControl
