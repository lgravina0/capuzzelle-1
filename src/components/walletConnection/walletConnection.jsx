import React, { useState, useEffect } from "react";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";
import * as s from "../../styles/globalStyles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import css from "./walletConnection.module.css";

export const StyledButton = styled.button`
  border-radius: 8px;
  border: none;
  background-color: #fac05e;
  padding: 8px 24px;
  font-weight: 900;
  color: #000000;
  cursor: pointer;

  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    font-family: "Inconsolata", monospace;
  }
`;
export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  background: var(--primary);

  @media (min-width: 767px) {
    flex-direction: row;
  }
`;
export const StyledLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
`;
function WalletConnection(props) {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;
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

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    console.log(cost);
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback(" Spiacente, qualcosa è andato storto. Riprova");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `UA, ${CONFIG.NFT_NAME} è tua! visita opensea per vederla.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
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
  useEffect(() => {
    getConfig();
  }, []);
  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <>
      <div className={css.walletConnectionContainer}>
        {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
          <>
            <div className={css.title}>
              Uè, le capuzzelle sono tutte adottate{" "}
            </div>
            <div className={css.infoNoCapuzzelle}>
              Non temere ci saranno nuove capuzzelle felici di essere adotatte,
              seguici per rimanere aggiornato sul prossimo drop!
            </div>

            <div className={css.containerButtons}>
              <a
                href="https://opensea.io/collection/e-capuzzelle"
                className={css.buttonNoCapuzzelle}
              >
                OPENSEA
              </a>
              <a
                href="https://discord.com/channels/1110284316640038922/1110284321413144698"
                className={css.buttonNoCapuzzelle}
              >
                DISCORD
              </a>
            </div>
          </>
        ) : (
          <>
            {blockchain.account === "" || blockchain.smartContract === null ? (
              <>
                <div className={css.title}>Adotta una capuzzella</div>
                <div className={css.subtitle}>
                  Le prime 50 capuzzelle saranno adottate in modo gratuito
                </div>
                <div className={css.howMuch}>
                  {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
                </div>
                <div className={css.howMuchSubtitle}>escluse tasse</div>
                <button
                  className={css.button}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  CONNETTITI AL WALLET
                </button>
                <div className={css.info}>connettiti alla rete polygon</div>
                {blockchain.errorMsg !== "" ? (
                  <>
                    <div className={css.info}>{blockchain.errorMsg}</div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className={css.title}>Capuzzelle adottate</div>

                <div className={css.totaleCapuzzelle}>
                  {data.totalSupply} / {CONFIG.MAX_SUPPLY}
                </div>
                <a
                  target={"_blank"}
                  href={CONFIG.SCAN_LINK}
                  className={css.walletLink}
                >
                  {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                </a>
                <div className={css.howMuch}>
                  {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
                </div>
                <div className={css.howMuchSubtitle}>escluse tasse</div>
                <button
                  className={css.button}
                  disabled={claimingNft ? 1 : 0}
                  onClick={(e) => {
                    e.preventDefault();
                    claimNFTs();
                    getData();
                  }}
                >
                  {claimingNft ? "STAI ADOTTANDO UNA CAPUZZELLA" : "ADOTTA"}
                </button>
                <div className={css.info}>connettiti alla rete polygon</div>
              </>
            )}
          </>
        )}

        {/* <s.SpacerLarge /> */}
        {/* <s.Container
          flex={2}
          jc={"center"}
          ai={"center"}
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: "24px",
            border: "2px solid var(--primary-text)",
          }}
        >
          <s.TextTitle
            style={{
              textAlign: "center",
              fontSize: 50,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            {data.totalSupply} / {CONFIG.MAX_SUPPLY}
          </s.TextTitle>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "#000000",
            }}
          >
            <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
              {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
            </StyledLink>
          </s.TextDescription>
          <span
            style={{
              textAlign: "center",
            }}
          ></span>
          <s.SpacerSmall />
          {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
            <>
              <div className={css.howMuch}>
                Tutte le capuzzelle sono state adottate.
              </div>
              <div className={css.howMuchSubtitle}>escluse tasse</div>

               <s.TextTitle style={{ textAlign: "center", color: "#ffffff" }}>
               
              </s.TextTitle>
              <s.TextDescription
                style={{ textAlign: "center", color: "#ffffff" }}
              >
                Puoi ancora trovare {CONFIG.NFT_NAME} su
              </s.TextDescription>
              <s.SpacerSmall />
              <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                {CONFIG.MARKETPLACE}
              </StyledLink> 
            </>
          ) : (
            <>
              <div className={css.howMuch}>
                {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
              </div>
              <div className={css.howMuchSubtitle}>escluse tasse</div>
              <div className={css.button}></div>

              {blockchain.account === "" ||
              blockchain.smartContract === null ? (
                <s.Container ai={"center"} jc={"center"}>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                    }}
                  >
                    Connettiti alla rete {CONFIG.NETWORK.NAME}
                  </s.TextDescription>
                  <s.SpacerSmall />
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                  >
                    CONNETTI IL WALLET
                  </StyledButton>
                  {blockchain.errorMsg !== "" ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "#ffffff",
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
              ) : (
                <>
                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                    }}
                  ></s.TextDescription>

                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs();
                        getData();
                      }}
                    >
                      {claimingNft
                        ? "STO ADOTTANDO UNA CAPUZZELLA"
                        : "ADOTTA UNA CAPUZZELLA"}
                    </StyledButton>
                  </s.Container>
                </>
              )}
            </>
          )}
          <s.SpacerMedium />
        </s.Container> */}
        {/* <s.SpacerLarge /> */}
      </div>
    </>
  );
}

export default WalletConnection;
