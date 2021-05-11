import React from 'react'

import S from './styles.module.scss';

import { SigninButton, ActiveLink } from '@/components';

export const Header = () => (
  <header className={S.headerContainer}>
    <div className={S.headerContent}>
      <img src="/images/logo.svg" alt="logo ig.news" width="110" height="31" />
      <nav>
        <ActiveLink activeClassName={S.active} href="/">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink activeClassName={S.active} href="/posts">
          <a>Posts</a>
        </ActiveLink>
      </nav>
      <SigninButton />
    </div>
  </header>
)
