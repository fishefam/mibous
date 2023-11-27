export const select = <T extends Element>(selector: string) => document.querySelector<T>(selector)
export const create = <T extends keyof HTMLElementTagNameMap>(element: {
  tag: T
  classnames?: string[]
  attributes?: [string, string][]
  text?: string
  parent?: string | Element
}) => {
  const { tag, attributes, classnames, parent, text } = element
  const elem = document.createElement(tag)
  if (text) elem.textContent = text
  if (classnames) elem.className = classnames.join(' ')
  if (attributes) attributes.forEach(([key, value]) => elem.setAttribute(key, value))
  if (parent && typeof parent === 'string') document.querySelector(parent)?.appendChild(elem)
  if (parent && typeof parent !== 'string') parent.appendChild(elem)
  return elem
}
