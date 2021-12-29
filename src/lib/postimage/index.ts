import { upload } from './upload'
import { download } from './download'

export const uploader = async (url: string): Promise<string> => {
  const directUrl = await upload(url)
  const directUrl2 = await download(directUrl.url)
  return directUrl2
}
