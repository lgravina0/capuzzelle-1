import React, { useState, useEffect } from "react";
import css from "./hero.module.css";

function Hero(props) {
  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };
  const [CONFIG, SET_CONFIG] = useState({});
  useEffect(() => {
    getConfig();
  }, []);

  
  return (
    <div id="hero" className={css.containerHero}>
      
        <img
          src="/config/images/crypta_logo.jpg"
          className={css.img}
          alt="logo_capuzzelle"
        />
      

      <span className={css.textDescription}>
        Entra nella Crypta, adotta una Capuzzella e scopri la nostra community.
      </span>
      {/* BUTTON ENTRA NELLA CRIPTA  */}
      {!props.showSite ? 
        <div className={css.container}>
          
          <button
            className={css.button}
            onClick={(e) => {
              e.preventDefault();
              props.setShowSite();
            }}
          >
            ENTRA NELLA CRYPTA
          </button>
          
        </div>
       : null}
    </div>
  );
}

export default Hero;
