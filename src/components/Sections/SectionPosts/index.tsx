import Link from 'next/link';

import S from './styles.module.scss';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

type PostProps = {
  posts: Post[]
}

export const SectionPost = ({ posts }: PostProps) => {

  return (
    <main className={S.container}>
      <div className={S.posts}>
        {posts.map(post => (
          <Link key={post.id} href={`/posts/${post.slug}`}>
            <a className={S.post}>
              <time className={S.time}>{post.updatedAt}</time>
              <strong className={S.title}>{post.title}</strong>
              <p className={S.description}>{post.excerpt}</p>
            </a>
          </Link>
        ))}
      </div>
    </main>
  )
};
