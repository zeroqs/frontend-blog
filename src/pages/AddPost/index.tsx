import React, {FC} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";

interface addProps {
  isAuth : boolean
}
interface postFormValues {
  title: string;
  tags: string;
  text: string;
}

export const AddPost:FC<addProps> = ({isAuth}) => {

  const { register, handleSubmit } = useForm<postFormValues>();
  const onSubmit: SubmitHandler<postFormValues> = data => console.log(data);

  const imageUrl = '';

  const [value, setValue] = React.useState('');
  const navigate = useNavigate()

  if (!isAuth) {
    navigate('/')
  }
  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );



    return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            {...register("title")}
            fullWidth
        />
        <TextField classes={{ root: styles.tags }} variant="standard" {...register("tags")} placeholder="Тэги" fullWidth />
        <SimpleMDE className={styles.editor} {...register("text")} value={value} onChange={onChange}  />
        <div className={styles.buttons}>
          <Button size="large" type="submit" variant="contained">
            Опубликовать
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </form>
    </Paper>
  );
};
