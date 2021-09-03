import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectroy = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // /posts 配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectroy)
  const allPostsData = fileNames.map((fileNames) => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileNames.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectroy, fileNames)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータの部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    }
  })

  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectroy)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectroy, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents)

  // マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // データを id および contentHtml と組み合わせる
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  }
}
