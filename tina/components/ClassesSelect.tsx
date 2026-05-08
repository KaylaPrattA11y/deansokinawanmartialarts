import React, { useEffect, useState } from 'react'
import { wrapFieldsWithMeta } from 'tinacms'
import { client } from '../__generated__/client'

export const ClassesSelect = wrapFieldsWithMeta(({ input }) => {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    client.queries.classesConnection().then((result) => {
      const names = (result.data.classesConnection.edges ?? [])
        .map((edge) => edge?.node?.name)
        .filter((name): name is string => Boolean(name))
      setOptions(names)
    })
  }, [])

  return (
    <select {...input} required>
      <option value="">Select a class...</option>
      {options.map((name) => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  )
})