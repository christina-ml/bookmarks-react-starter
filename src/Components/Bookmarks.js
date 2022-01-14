import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_FROM_OUR_BACKEND;
// console.log(API);

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(()=>{
    // console.log("Trigger");
    //  /bookmarks (relative path)
    //  http://www.localhost:3003/bookmarks  (absolute path - this will work!)
    /* Using `axios` */  
    axios.get(`${API_URL}/bookmarks`)
      .then((res)=>{
        setBookmarks(res.data);
        console.log(res.data);
      }).catch((err)=>{
        throw err;
      })

      /* Same thing we did with `axios`, but with `fetch` */
      // fetch(`${API_URL}/bookmarks`)
      //   .then((res)=>{
      //     return res.json();
      //   }).then((data)=>{
      //     setBookmarks(data);
      //     console.log(data);
      //   }).catch((err)=>{
      //     throw err;
      //   })
  }, []);

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
