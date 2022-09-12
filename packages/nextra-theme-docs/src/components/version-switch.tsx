import React, { ReactElement, useState } from 'react'
import { ArrowRightIcon } from 'nextra/icons'
import { useRouter } from 'next/router'
import { Select } from './select'
import { PageItem } from '../utils'

export function VersionSwitch({
  options
}: {
  options: PageItem[]
}): ReactElement {
  const router = useRouter()
  const [route, setRoute] = useState(
    () => options.find(opt => router.route.startsWith(opt.route))?.route || ''
  )
  const selected = route ? options.find(opt => opt.route === route) : options[0]
  return (
    <Select
      className="flex gap-1 items-center"
      onChange={option => {
        setRoute(option.key)
        router.push(option.key)
      }}
      selected={{
        key: route,
        name: (
          <>
            {selected?.title}
            <ArrowRightIcon
              className="shrink-0 h-3.5 w-3.5"
              pathClassName="[[aria-expanded='true']>svg>&]:rotate-[270deg] origin-center transition-transform rotate-90"
            />
          </>
        )
      }}
      options={options.map(o => ({
        key: o.route,
        name: o.title
      }))}
    />
  )
}
