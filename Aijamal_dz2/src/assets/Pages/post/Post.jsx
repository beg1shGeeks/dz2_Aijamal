import style from './post.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { DATA_POST } from '../../../store/store';

const Post = () => {
  const dispatch = useDispatch();
  const dataPosts = useSelector((state) => state);
  console.log(dataPosts);
  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      );
      dispatch({ type: DATA_POST, payload: response.data });
    };
    getPost();
  }, []);

  return (
    <div className={style.container}>
      {dataPosts &&
        dataPosts.map((post) => (
          <div key={post.id} className={style.post_container}>
            <h2>{post.title}</h2>
            <div>{post.body}</div>
          </div>
        ))}
    </div>
  );
};

export default Post;
