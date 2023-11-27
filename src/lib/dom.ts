export const select = <T extends Element>(selector: string) => document.querySelector<T>(selector)
export const create = <T extends keyof HTMLElementTagNameMap>(element: {
  tag: T
  classnames?: string[]
  attributes?: [string, string][]
  innerHtml?: string
  text?: string
  parent?: string | Element
}) => {
  const { tag, innerHtml, attributes, classnames, parent, text } = element
  const elem = document.createElement(tag)
  if (innerHtml) elem.innerHTML = innerHtml
  if (!innerHtml && text) elem.textContent = text
  if (classnames) elem.className = classnames.join(' ')
  if (attributes) attributes.forEach(([key, value]) => elem.setAttribute(key, value))
  if (parent && typeof parent === 'string') document.querySelector(parent)?.appendChild(elem)
  if (parent && typeof parent !== 'string') parent.appendChild(elem)
  return elem
}
export const getFormData = <T>(form: HTMLFormElement | string): T =>
  Object.fromEntries(
    new FormData(typeof form === 'string' ? (document.querySelector(form) as HTMLFormElement | undefined) : form),
  ) as T
