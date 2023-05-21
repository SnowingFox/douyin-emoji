export interface Response {
  status_code: number
  version: number
  emoji_list: EmojiList[]
}

export interface EmojiList {
  origin_uri: string
  display_name: string
  hide: number
  emoji_url: EmojiUrl
}

interface EmojiUrl {
  uri: string
  url_list: string[]
}
