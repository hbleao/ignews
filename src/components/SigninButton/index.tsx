import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import S from './styles.module.scss'

export const SigninButton = () => {
  const [session] = useSession()
  console.log('session', session)

  return (
    <button type="button" className={S.singinButton} onClick={() => session ? signOut() : signIn('github')}>
      <FaGithub color={session ? "#04d361" : "#EBA417" } />
      {session ? session.user.name : 'Sign in with Github'}
      {session && <FiX color="#737380" className={S.closeIcon} />}
    </button>
  );
}