import axios from 'axios'
interface Ok {
  status: 'OK'
  url: string
}
interface Err {
  status: 'error'
  error: string
}

function rand_string(e: number) {
  for (
    var t = '',
      i = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      n = 0;
    n < e;
    n++
  )
    t += i.charAt(Math.floor(Math.random() * i.length))
  return t
}
function objectToQueryString(obj: any) {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  DNT: '1',
  Referer: 'https://postimages.org/web',
  'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"`,
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'Linux',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
}
const mainurl = 'https://postimages.org/web'
const numfiles = 1
const gallery = ''

export const upload = async (url: string): Promise<Ok> => {
  const cdata = (await axios.get<string>(mainurl)).data
  const upload_session = rand_string(32)
  const token = cdata.split("'token'")[1].split("'")[1].split("'")[0]
  const session_upload = Date.now()
  const ui = [24, 1920, 1080, true, '', '', new Date().toLocaleString()]
  const data = {
    token,
    upload_session,
    url,
    numfiles,
    gallery,
    ui,
    optsize: 0,
    expire: 0,
    session_upload,
  }
  const response = await axios.post<Err | Ok>(
    'https://postimages.org/json/rr',
    objectToQueryString(data),
    { headers }
  )
  if (response.data.status !== 'OK') throw new Error(response.data.error)
  return response.data
}
