import type { InitData } from 'type/mobius'

import { create, getFormData } from './dom'

const MOBIUS_DATA_REGEX = /<form.*editQuestionForm(.|\n|\r|\n)*<\/form>/i

export const fetchData = async () => {
  const response = await fetch(location.href)
  const text = await response.text()
  const formHtml = text.match(MOBIUS_DATA_REGEX)?.[0] as string
  const container = create({ innerHtml: formHtml, tag: 'div' })
  const form = container.firstElementChild
  const data = getFormData<InitData>(form as HTMLFormElement)
  return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== '')) as InitData
}
