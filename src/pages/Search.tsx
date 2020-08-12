import React, { useEffect, useContext } from "react";
import Layout from "../compornents/Layout/Layout";
import { useLocation } from "react-router-dom";
import { fetchSearchData } from "../apis";
import { Store } from "../store";
import { SET_SEARCHED } from "../action";
import VideoGrid from "../compornents/VideoGrid/VideoGrid";
import VideoGridItem from "../compornents/VideoGridItem/VideoGridItem";

const Search = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();
  const setSerchResult = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    console.log(query);
    if (query) {
      await fetchSearchData(query).then((res) => {
        setGlobalState({
          type: SET_SEARCHED,
          payload: { searched: res.data.items },
        });
      });
    }
  };
  useEffect(() => {
    setSerchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  return (
    <Layout>
      <VideoGrid>
        {globalState.searched ? (
          globalState.searched.map((searched) => {
            return (
              <VideoGridItem
                id={searched.id.videoId}
                key={searched.id.videoId}
                src={searched.snippet.thumbnails.medium.url}
                title={searched.snippet.title}
              />
            );
          })
        ) : (
          <p>no data found!!!</p>
        )}
      </VideoGrid>
    </Layout>
  );
};

export default Search;
