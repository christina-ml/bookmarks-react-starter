import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // http://localhost:3003/bookmarks/0  --> what we want to connect from the backend
    // console.log(index);
    // console.log(`${process.env.REACT_APP_API_URL_FROM_OUR_BACKEND}/bookmarks/${index}`)
    axios.get(`${process.env.REACT_APP_API_URL_FROM_OUR_BACKEND}/bookmarks/${index}`)
      .then((res)=>{
        // console.log(res.data);
        setBookmark(res.data);
      }).catch(()=>{
        /* what it looks like when there is no endpoint */
        navigate("/not-found");
      })

    /* Equivalent using fetch - just to see difference btwn axios */
    // fetch(`${process.env.REACT_APP_API_URL_FROM_OUR_BACKEND}/bookmarks/${index}`)
    //   .then((res)=>res.json())
    //   .then((data)=>{
    //     setBookmark(data);
    //   }).catch(()=>{
    //     navigate("/not-found")
    //   })

  }, [index]);
  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL_FROM_OUR_BACKEND}/bookmarks/${index}`)
      .then((res)=>{
        // navigate back to the homepage after it's been deleted
        navigate("/bookmarks")
      }).catch((err)=>{
        console.log(err);
      })
  };
  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
