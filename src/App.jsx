import "./App.css";
import React, { useState, useEffect } from "react";
import { formatDate } from "./helper/formatDate";
import { loadingMessages } from "./data/messages";
import { backgroundIds } from "./data/background";

const number = Math.floor(Math.random() * backgroundIds.length + 1);
const page_background = `https://cdn.7tv.app/emote/${backgroundIds[number].id}/4x.webp`;
const pepePoint = `https://cdn.7tv.app/emote/${
  backgroundIds.find((img) => img.name === "pepepoint").id
}/1x.webp`;
const cogger = `https://cdn.7tv.app/emote/${
  backgroundIds.find((img) => img.name === "COGGERS").id
}/4x.webp`;

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cupge, setCupge] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let response = await fetch(
          "https://polite-conkies-75f54b.netlify.app/.netlify/functions/api/currentcup"
        );
        response = await response.json();

        setData(response.competitions);
      } catch (error) {}
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const now = new Date();
    const latestCup = data.find((cup) => {
      return cup.name === `COTD ${formatDate(now)} #1`;
    });
    setCupge(latestCup);
    document.title = latestCup ? `div ${
      latestCup && Math.floor(Math.round(latestCup.players * 0.1) / 64) + 1
    } pepepoint` : 'Waiting for next cupge';
  }, [data]);

  const type2 = cupge && Math.floor(Math.round(cupge.players * 0.1) / 64);
  const type3 = cupge && Math.floor(Math.round(cupge.players * 0.25) / 64);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${page_background})`,
        backgroundRepeat: "repeat-x repeat-y",
      }}
    >
      <div className="wrapper">
        {loading && (
          <>
            <div>
              {
                loadingMessages[
                  Math.floor(Math.random() * loadingMessages.length)
                ]
              }
            </div>
            <img className="cogger" alt="cogger" src={cogger} />
          </>
        )}
        {data && cupge ? (
          <>
            <h1>{cupge.name}</h1>
            <p>Player count: {cupge.players}</p>
            <p>
              Highest pos for type 2:&nbsp;
              <strong>{`${type2 * 64} (div ${type2})`}</strong>
            </p>
            <p>
              Highest pos for type 3:&nbsp;
              <strong>{`${type3 * 64} (div ${type3})`}</strong>
            </p>
            <p>
              {`div ${type2 + 1} players `}
              <img className="pepepoint" alt="pepepoint" src={pepePoint} />
            </p>
          </>
        ) : (
          <div>Waiting for next copeh</div>
        )}
      </div>
    </div>
  );
};

export default App;
