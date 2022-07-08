import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

const page_background = process.env.PUBLIC_URL + "/" +  Math.floor((Math.random() * 25)) + '.webp';


function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cupge, setCupge] = useState(null);

  const loadingMessages = [
    "Processing the scam...",
    "Dingsing the dongs...",
    "Keoso the silver 3 KEKL...", 
    "AT Medal could be a bit more challenging...",
    "mhm?",
    "Checking scam...",
    "Feel free to give me inspiration for some loading message Shkofus",
    "Scamfus ?",
    "Loading message edit 9...",
    "Support me on paypal or rito"
  ]

  useEffect(()=>{
    async function fetchData(){
      setLoading(true);
      let response = await fetch('https://tm-stats-bknd.herokuapp.com/currentcup');
      response = await response.json();
      setData(response.competitions);
      setLoading(false);
    }
    fetchData();
  }, [])

  useEffect(()=>{
    if(data){
      for(let i=0; i<data.length; ++i){
        if(data[i].name.includes("#1")){
          setCupge(data[i]);
          document.title= `div ${Math.floor(data[i].players*0.1/64)+1} pepepoint`
          break;
        }
      }
    }
  }, [data])

    return (
      <div className='app' style={{backgroundImage: `url(${page_background})`, backgroundRepeat: "repeat-x repeat-y"}}>
        <div className='wrapper'>
          {loading && (
            <>
              <div>{loadingMessages[Math.floor((Math.random() * loadingMessages.length))]}</div>
              <img className="cogger" alt="cogger"src={process.env.PUBLIC_URL + '/cogger.webp'}/>
            </>
            
          )}
          {cupge && (
            <>
              <h1>{cupge.name}</h1>
              <p>Player count: {cupge.players}</p>
              <p>Highest pos for type 2: <strong>{Math.floor(cupge.players*0.1/64)*64}</strong></p>
              <p>Highest pos for type 3: <strong>{Math.floor(cupge.players*0.25/64)*64}</strong></p>
              <p>div {Math.floor(cupge.players*0.1/64)+1} players <img className="pepepoint" alt="pepepoint"src={process.env.PUBLIC_URL + '/25.webp'}/></p>
            </>
            
          )}
          
        </div>
        
      </div>
    );
  
  
}

export default App;
