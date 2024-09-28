import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
    } catch (error) {
      console.error("Error al obtener posts:", error);
    }
  };

  const agregarPost = async () => {
    try {
      const post = { titulo, img: imgSrc, descripcion };
      await axios.post(urlBaseServer + "/posts", post);
      getPosts();
    } catch (error) {
      console.error("Error al agregar post:", error);
    }
  };

  const like = async (id) => {
    try {
      await axios.put(urlBaseServer + `/posts/like/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const eliminarPost = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/posts/${id}`);
      getPosts();
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
