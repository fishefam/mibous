export const resolveUrl = (path: string) => (browser ?? chrome).runtime.getURL(path)
