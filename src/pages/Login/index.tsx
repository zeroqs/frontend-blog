import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm, SubmitHandler} from "react-hook-form";
import {FormValues, User} from "../../types/types";
import {useMutation} from "react-query";
import {userData} from "../../services/services";
import {Navigate, useNavigate} from "react-router";


export const Login = ({setState}) => {
    const navigate = useNavigate()
    const isAuth = (data : User | TypeError) => {
        if ("_id" in data) {
            navigate('/')
        }
    }
    const {register, handleSubmit, formState : {errors}} = useForm<FormValues>({
        defaultValues: {
            email: 'testx4@list.ru',
            password: '1234567',
        },
        mode: "onChange"
    });


    const {isLoading, mutateAsync} = useMutation('login', (values : FormValues) => userData(values), {
        onSuccess: (data, variables) => {
            isAuth(data)
        },
        onError: (error : TypeError) => {
            isAuth(error)

        }
    })

    const onSubmit: SubmitHandler<FormValues> = async data => {
        const res = await mutateAsync(data)
        if (!res) alert('Не удалось авторизоваться')
        if ('token' in res) {
            window.localStorage.setItem('token', res.token)
            setState(true)
        }
    };
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type='email'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email", {required : 'Укажите почту'})}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Пароль" {...register("password",{required : 'Укажите пароль'})}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
