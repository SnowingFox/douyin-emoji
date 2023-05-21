import axios, { type AxiosResponse } from 'axios'
import {EmojiList, Response} from './response'
import * as fs from 'node:fs'

const url = 'https://www.douyin.com/aweme/v1/web/emoji/list'

const output = './emoji'

async function downloadEmoji(emoji: EmojiList) {
  const imgUrl = emoji.emoji_url.url_list[0]
  const imgResponse = await axios({
    url: imgUrl,
    responseType: 'stream'
  })

  const outputDir = `${output}/${emoji.origin_uri}`

  imgResponse.data.pipe(fs.createWriteStream(outputDir))

  console.log(`${emoji.display_name} 下载成功`)
}

async function run() {
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output)
  }

  const response = await axios.get(url) as AxiosResponse<Response>
  const emojiList = response.data

  const promises = emojiList.emoji_list.map((emoji, index) => downloadEmoji(emoji))

  await Promise.all(promises)

  console.log(`所有表情包下载完成，共下载 ${emojiList.emoji_list.length} 个表情包`)
}

run()
