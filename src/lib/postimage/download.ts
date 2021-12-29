import axios from 'axios'
import isUrl from 'is-url'
export const download = async (url: string): Promise<string> => {
  const response = await axios.get<string>(url)
  const html = response.data
  // create regex to get url from html
  const directUrl = html
    .split('id="code_direct"')[1]
    .split('"')
    .filter(isUrl)[0]
  return directUrl
}
