import React from 'react';
import Link from 'next/link'

import S from './styles.module.scss';

import { SigninButton } from '../SigninButton';

export const Header = () => {

  return (
    <header className={S.headerContainer}>
      <div className={S.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" width="110" height="31" />
        <nav>
          <Link href="/">
            <a className={S.active}>Home</a>
          </Link>
          <Link href="/">
            <a>Posts</a>
          </Link>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}