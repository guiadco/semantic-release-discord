import { URL } from "url";

export function repositoryUrl(url) {
  if (url.startsWith('git@')) {
    url = 'ssh://' + repositoryUrl
  }
  const parsedUrl = new url.URL(
    // without these replacements we will get a TypeError [ERR_INVALID_URL]
    url.replace(
      /\.([a-z])*:/i,
      rep => rep.substring(0, rep.length - 1) + '/'
    )
  )
  const path = parsedUrl.pathname
    .substring(1) // remove leading "/"
    .replace('.git', '') // remove .git
    .replace(':', '') // remove any colons from path (present in github for example)
  const hostname = parsedUrl.hostname
  const URL = `https://${parsedUrl.host}/${path}`
  return { path, URL, hostname }
}
