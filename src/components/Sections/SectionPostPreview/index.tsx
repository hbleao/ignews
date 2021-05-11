import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

import S from './styles.module.scss';

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
};

export const SectionPostPreview = ({ post }: PostProps) => {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`); 
    };
  }, [session?.activeSubscription]);

  return (
    <main className={S.container}>
      <article className={S.post}>
        <h1 className={S.title}>{post.title}</h1>
        <time className={S.time}>
         { post.updatedAt }
        </time>
        <div
          className={`${S.postContent} ${S.previewContent}`}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div className={S.continueReading}>
          Gostaria de ler mais ?
          <Link href="">
            <a>
              Inscreva-se agora 🤗
            </a>
          </Link>
        </div>

      </article>
    </main>
  )
};