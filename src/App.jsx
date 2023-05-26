import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions.jsx";
import * as s from "./styles/globalStyles.jsx";
import styled from "styled-components";

import "./App.css";
import Hero from "./components/hero/hero.jsx";
import WalletConnection from "./components/walletConnection/walletConnection.jsx";





export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;



export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;



function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const [showSite, setshowSite] = useState(false);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "'A Capuzzella",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: "0.00",
    GAS_LIMIT: 0,
    MARKETPLACE: "opensea",
    MARKETPLACE_LINK: "https://opensea.io/collection/e-capuzzelle",
    SHOW_BACKGROUND: false,
  });


  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

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
  const show = () => {
    document.body.style.overflow = "auto";
    document
      .getElementById("progettoegallery")
      .scrollIntoView({ behavior: "smooth" });
    setshowSite(true);
  };
  useEffect(() => {
    getConfig();
    document.body.style.overflow = "hidden";
    document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
    setshowSite(false);
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <Hero showSite={showSite} setShowSite={() => show()}></Hero>
      <s.SpacerSmall />
      <section id="crypta"></section>
      {
        <div className={showSite ? "show" : "hide"}>
          <section id="progettoegallery">
            <WalletConnection></WalletConnection>
            <div id="containerProgettoeGallery">
              <section id="progetto">
                <div className="">
                  <h1>💀Che cos’è Crypta Capuzzelle?💀</h1>
                </div>
                <div className="">
                  <p>
                    {" "}
                    Il progetto <bold>“Crypta Capuzzelle”</bold> rappresenta la
                    trasformazione di uno dei luoghi più suggestivi e misteriosi
                    di Napoli in un’opera digitale unica. Le capuzzelle del
                    cimitero delle fontanelle sono teschi posti sulla superficie
                    delle pareti antropizzate con l’obiettivo di liberare le
                    anime dei defunti che, altrimenti, sarebbero rimaste in
                    eterno in balia del limbo. Con gli NFT, queste capuzzelle
                    diventano oggetti digitali dotati di una nuova vita, grazie
                    alla tecnologia blockchain che ne garantisce l’autenticità e
                    l’unicità. La collezione rappresenta un omaggio alla cultura
                    e alla tradizione napoletana, ma anche un esempio di come
                    l’arte digitale possa rielaborare e arricchire il patrimonio
                    culturale del nostro paese.
                  </p>
                </div>
              </section>
              <section id="gallery">
              <img class="one" src="config/images/gallery_one.png"  alt="" />
                <img class="two" src="config/images/gallery_two.png" alt="" />
                <a href="https://opensea.io/collection/e-capuzzelle" id="collection">SCOPRI LA COLLEZIONE</a>
              </section>
            </div>
          </section>
          <section id="roadmap">
            <div id="roadmapContainer">
              <div id="title">Roadmap</div>
              <div id="description">
                Il progetto “Crypta Capuzzelle” rappresenta la trasformazione di
                uno dei luoghi più suggestivi e misteriosi di Napoli in un’opera
                digitale unica.
              </div>
              <div className="roadmapItem stroked">
                <img src="config/images/Checkbox_filled.png" alt="checkbox" />
                Lancio adozione 50 capuzzelle
              </div>
              <div className="roadmapItem stroked">
                <img src="config/images/Checkbox_filled.png" alt="checkbox" />
                Creazione canale Discord
              </div>
              <div className="roadmapItem">
                <img src="config/images/Checkbox_empty.png" alt="checkbox" />
                Fine adozione 50 capuzzelle
              </div>
              <div className="roadmapItem">
                <img src="config/images/Checkbox_empty.png" alt="checkbox" />
                Merch esclusivo
              </div>
              <div className="roadmapItem">
                <img src="config/images/Checkbox_empty.png" alt="checkbox" />
                Drop nuove capuzzelle
              </div>
              <div className="roadmapItem">
                <img src="config/images/Checkbox_empty.png" alt="checkbox" />
                Collaborazioni
              </div>
              <div className="roadmapItem">
                <img src="config/images/Checkbox_empty.png" alt="checkbox" />
                Fase 3
              </div>
            </div>
            <div id="social">
              <a href="https://www.instagram.com/crypta_capuzzelle/">
                <img src="config/images/instagram.svg" alt="instagram" />
              </a>
              <iframe
                src="https://discord.com/widget?id=1110284316640038922&theme=dark"
                height="250"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              ></iframe>
              {/* <img src="config/images/discord.svg" alt="discord" /> */}
            </div>
          </section>
          <section id="lecape">
            <div id="title">Le cape</div>
            <div id="description">
              Il progetto “Crypta Capuzzelle” rappresenta la trasformazione di
              uno dei luoghi più suggestivi e misteriosi di Napoli in un’opera
              digitale unica.
            </div>
            <div id="containerCape">
              <div className="capa">
                <div className="img">
                  <img
                    src="config/images/lorenzo_gravina.png"
                    alt="lorenzo gravina"
                  />
                </div>
                <div className="name">Lorenzo Gravina</div>
                <div className="role">Artist</div>
              </div>
              <div className="capa">
                <div className="img">
                  <img src="config/images/1.png" alt="Antonio Ferrarioli" />
                </div>
                <div className="name">Antonio Ferraioli</div>
                <div className="role">Head of Stuff</div>
              </div>
              <div className="capa">
                <div className="img">
                  <img src="config/images/4.png" alt="Costantino Sorrentino" />
                </div>
                <div className="name">Costantino Sorrentino</div>
                <div className="role">Dev</div>
              </div>
            </div>
          </section>
          {/* <section id="team">
            <div>
              <h1>Team</h1>
            </div>
            <div className="card-group">
              <div className="card">
                <img src="config/images/1.png" alt="" />
                <h3>Antonio Ferraioli</h3>
                <p>Head of Stuff</p>
              </div>
              <div className="card">
                <img src="config/images/lorenzo_gravina.png" alt="" />
                <h3>Lorenzo Gravina</h3>
                <p>Artist</p>
              </div>
            </div>
        </section> */}
          <section id="faq">
            <div className="container-faq">
              <h1>FAQ</h1>
              <div className="accordion">
                <details>
                  <summary>Che cos'è il minting di NFT?</summary>
                  <p>
                    Il minting di NFT è il processo di creazione di un token non
                    fungibile (NFT) su una rete blockchain.
                  </p>
                </details>
                <details>
                  <summary>
                    Quali sono i requisiti per il minting di NFT?
                  </summary>
                  <p>
                    Per effettuare il minting di NFT è necessario disporre di
                    una connessione internet, un portafoglio digitale (wallet) e
                    un token nativo della blockchain su cui si vuole creare
                    l'NFT.
                  </p>
                </details>
                <details>
                  <summary>
                    Quali tipi di file possono essere utilizzati per il minting
                    di NFT?
                  </summary>

                  <p>
                    I file comuni utilizzati per il minting di NFT includono
                    immagini, video, audio e altri tipi di contenuti digitali.
                  </p>
                </details>
                <details>
                  <summary>
                    Quali sono le piattaforme più popolari per il minting di
                    NFT?
                  </summary>

                  <p>
                    Le piattaforme più popolari per il minting di NFT includono
                    Ethereum, Binance Smart Chain, Polygon, Tezos e molti altri.
                  </p>
                </details>
                <details>
                  <summary>Quali costi comporta il minting di NFT?</summary>
                  <p>
                    Il costo del minting di NFT può variare a seconda della
                    piattaforma utilizzata, del tipo di file utilizzato e del
                    valore dell'NFT creato.
                  </p>
                </details>

                <details>
                  <summary>
                    Qual è la differenza tra un token fungibile e un token non
                    fungibile?
                  </summary>

                  <p>
                    Un token fungibile è uno scambio equivalente a un altro
                    dello stesso valore, come una valuta digitale come il
                    Bitcoin. D'altra parte, un token non fungibile è unico e
                    irripetibile, come un'opera d'arte, un oggetto da collezione
                    o un biglietto autografato.
                  </p>
                </details>
                <details>
                  <summary>Come posso acquistare o vendere un NFT?</summary>

                  <p>
                    Gli NFT possono essere acquistati o venduti su diverse
                    piattaforme online che offrono servizi di trading.
                    Assicurati di fare attenzione alle commissioni di
                    transazione e alle politiche di conservazione della
                    piattaforma prima di procedere con l'acquisto o la vendita.
                  </p>
                </details>
                <details>
                  <summary>Come posso proteggere il mio NFT?</summary>

                  <p>
                    Gli NFT vengono registrati sulla blockchain e vengono quindi
                    garantiti dall'immutabilità e dalla trasparenza di questo
                    registro. Alcuni proprietari di NFT scelgono inoltre di
                    conservare i loro token in portafogli freddi o wallet
                    hardware per una maggiore sicurezza.
                  </p>
                </details>
                <details>
                  <summary>
                    Quali sono le tendenze più recenti nel mondo del minting d
                    NFT?
                  </summary>

                  <p>
                    Alcune delle tendenze più recenti nel mondo del minting di
                    NFT includono l'utilizzo della tecnologia blockchain per
                    combattere la contraffazione, l'uso di NFT come garanzia per
                    prestiti e la creazione di NFT "smart" che consentono di
                    sbloccare l'accesso a contenuti o servizi specifici.
                  </p>
                </details>
                <details>
                  <summary>
                    Dove posso trovare ulteriori informazioni sull'argomento del
                    minting di NFT?
                  </summary>

                  <p>
                    Puoi trovare ulteriori informazioni sul minting di NFT sul
                    sito del progetto blockchain che utilizzi o tramite risorse
                    online come blog specializzati, forum e comunità di utenti.
                  </p>
                </details>
              </div>
            </div>
          </section>
          <section id="footer">
            <img src="config/images/crypta_logo.jpg" alt="" />
            <p>
              Copyrights – 2023 CRYPTA CAPUZZELLE by Lorenzo Gravina - Antonio
              Ferraioli & Costantino Sorrentino . All rights reserved
            </p>
          </section>
        </div>
      }
      {/* </s.Container>
      </s.Screen> */}
    </>
  );
}

export default App;
