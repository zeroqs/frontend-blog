import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {FormRegistrationValues, FormValues, User} from "../../types/types";

import styles from './Login.module.scss';
import {useForm} from "react-hook-form";
import {SubmitHandler} from "react-hook-form";
import {useMutation} from "react-query";
import {signUpMe, userData} from "../../services/services";
import {useNavigate} from "react-router";

export const Registration = ({setState,setUser}) => {
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}} = useForm<FormRegistrationValues>({
        defaultValues: {
            fullName: 'Test Reg',
            email: 'testx5@list.ru',
            password: '1234567',
        },
        mode: 'onChange'
    });

    const isAuth = (data : User | TypeError) => {
        if ("_id" in data) {
            navigate('/')
        }
    }

    const {isLoading, mutateAsync} = useMutation('login', (values : FormRegistrationValues) => signUpMe(values), {
        onSuccess: (data, variables) => {
            isAuth(data)
        },
        onError: (error : TypeError) => {
            isAuth(error)

        }
    })
    const onSubmit: SubmitHandler<FormRegistrationValues> = async data => {
        const res = await mutateAsync(data)
        if (!res) alert('Не удалось авторизоваться')
        if ('token' in res) {
            window.localStorage.setItem('token', res.token)
            setState(true)
            setUser(res)
        }
    }
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField className={styles.field} {...register("fullName", {required: 'Укажите Имя Фамилия'})}
                           label="Полное имя" fullWidth error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}/>
                <TextField className={styles.field} type="email" {...register("email", {required: 'Укажите почту'})}
                           label="E-Mail" fullWidth error={Boolean(errors.email?.message)}
                           helperText={errors.email?.message}/>
                <TextField className={styles.field}
                           type='password' {...register("password", {required: 'Укажите пароль'})}
                           label="Пароль" fullWidth error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
