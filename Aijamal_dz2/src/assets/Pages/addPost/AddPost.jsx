import { v4 as uuidv4 } from 'uuid';
import style from './addPost.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST } from '../../../store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPost = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const hendelAddPost = (e) => {
    e.preventDefault();

    if (!String(e.target[0].value) == '' && !String(e.target[1].value) == '') {
      const addPostApi = async () => {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/posts/',
          {
            body: {
              title: e.target[0].value,
              body: e.target[1].value,
              userId: 1,
            },
          }
        );
        // const resData = await response;
        console.log(response.data.body);
        let newPost = {
          id: uuidv4(),
          title: response.data.body.title,
          body: response.data.body.body,
        };
        dispatch({ type: ADD_POST, payload: newPost });
        navigate('/');
      };
      addPostApi();
    } else {
      alert('заполине поля');
    }
  };
  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={(e) => hendelAddPost(e)}>
        <input type="text" placeholder="title" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="body"
        ></textarea>
        <button type="submit">Добавить пост</button>
      </form>
    </div>
  );
};

export default AddPost;
