import S from './styles.module.scss';

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
};

export const SectionPostDetail = ({ post }: PostProps) => {

  return (
    <main className={S.container}>
      <article className={S.post}>
        <h1 className={S.title}>{post.title}</h1>
        <time className={S.time}>
         { post.updatedAt }
        </time>
        <div
          className={S.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

      </article>
    </main>
  )
};