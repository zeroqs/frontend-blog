import React, {FC} from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {initialUser} from "../../App";
import {User} from "../../types/types";


interface HeaderProps {
  isAuth : boolean,
  setIsAuth : (arg:boolean) => void
  setUser : (arg:User) => void
}


export const Header:FC<HeaderProps> = ({isAuth,setIsAuth,setUser}) => {

  const onClickLogout = () => {
    setIsAuth(false)
    window.localStorage.removeItem('token')
    setUser(initialUser)
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
