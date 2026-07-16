import React, { useEffect, useState } from 'react'
import { wrapFieldsWithMeta, useCMS } from 'tinacms'

export const ClassesSelect = wrapFieldsWithMeta(({ input }) => {
  const [options, setOptions] = useState<string[]>([])
  const cms = useCMS()

  useEffect(() => {
    cms.api.tina.request<{ classesConnection: { edges: Array<{ node: { name: string } } | null> } }>(
      `query { classesConnection { edges { node { name } } } }`,
      { variables: {} }
    ).then((data) => {
      const names = (data?.classesConnection?.edges ?? [])
        .map((edge) => edge?.node?.name)
        .filter((name): name is string => Boolean(name))
      setOptions(names)
    }).catch(() => {
      // Leave options empty if the query fails
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