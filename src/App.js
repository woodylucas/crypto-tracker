import React, { useState, useEffect } from "react";
import Coin from "./components/Coin";
import axios from "axios";

function App() {
  const [coins, setCoins] = useState([]);
  const [term, setTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      console.log(data);
      setCoins(data);
    };
    fetchData();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="coint-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            placeholder="Search"
            value={term}
            onChange={(evt) => setTerm(evt.target.value)}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
