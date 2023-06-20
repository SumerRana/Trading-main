import React, { useState, useCallback, useEffect, useRef } from "react";
import "./app.css";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";
import { BlockchainContext } from "./contexts/BlockchainProvider";
import { HashLoader } from "react-spinners";

interface QuerriedOffer {
  id: number;
  offerString: string | null;
  offerCrreator: string | null;
}

const App: React.FC = () => {
  // Accessing the Web3ModalContext
  const { web3, account, connect, disconnect, signer, chainId } = React.useContext(
    Web3ModalContext
  );

  //allowance status
  const [woodAllowance, setWoodAllowance] = useState("");
  const [rockAllowance, setRockAllowance] = useState("");
  const [clayAllowance, setClayAllowance] = useState("");
  const [woolAllowance, setWoolAllowance] = useState("");
  const [fishAllowance, setFishAllowance] = useState("");
  const [rockAllowance, setRockAllowance] = useState("");
  const [woodAllowance, setWoodAllowance] = useState("");
  const [woolAllowance, setWoolAllowance] = useState("");

  const [tokenAmounts, setTokenAmounts] = useState(Array(10).fill(undefined));
  const [tokensOfferedData, setTokensOfferedData] = useState(Array(5).fill(undefined));
  const [tokensWantedData, setTokensWantedData] = useState(Array(5).fill(undefined));

  
  const [OfferSubmitted, setOfferSubmit] = useState(false);



  // State for tokens offered and tokens wanted
  const [tokensOffered, setTokensOffered] = useState([
    { id: 1, token: "", amount: 0 }
  ]);
  const [tokensWanted, setTokensWanted] = useState([
    { id: 1, token: "", amount: 0 }
  ]);


  // add the blockchain context 
  const {
    woodInTheBlockchainLand: WoodInTheBlockchainLandWrapper,
    rockInTheBlockchainLand: RockInTheBlockchainLandWrapper,
    CLAYInTheBlockchainLand: CLAYInTheBlockchainLandWrapper,
    woolInTheBlockchainLand: WoolInTheBlockchainLandWrapper,
    fishInTheBlockchainLand: FishInTheBlockchainLandWrapper,
    tradeOffer: tradeOfferWrapper

  } = React.useContext(BlockchainContext);

  // State for open offers
  const [openOffers, setOpenOffers] = useState<Offer[]>([]);
  // const tokensWantedData = Array(5);
  // const tokensOfferedData = Array(5);

  // edited by developer reEdit by master
  // const getWoodAllowance = async () => {
  //   if (web3 && account && chainId && tokenAmounts[0] > 0) {
  //     const _woodAllowance = await WoodInTheBlockchainLandWrapper?.allowance();
  //     setWoodAllowance(String(Number(_woodAllowance) / 10 ** 18) || "0");
  //   }
  // }
  // const getRockAllowance = async () => {
  //   if (web3 && account && chainId && tokenAmounts[1] > 0) {
  //     const _rockAllowance = await RockInTheBlockchainLandWrapper?.allowance();
  //     setRockAllowance(String(Number(_rockAllowance) / 10 ** 18) || "0");
  //   }
  // }
  // const getClayAllowance = async () => {
  //   if (web3 && account && chainId && tokenAmounts[2] > 0) {
  //     const _clayAllowance = await CLAYInTheBlockchainLandWrapper?.allowance();
  //     setClayAllowance(String(Number(_clayAllowance) / 10 ** 18) || "0");
  //   }
  // }
  // const getWoolAllowance = async () => {
  //   if (web3 && account && chainId && tokenAmounts[3] > 0) {
  //     const _woolAllowance = await WoolInTheBlockchainLandWrapper?.allowance();
  //     setWoolAllowance(String(Number(_woolAllowance) / 10 ** 18) || "0");
  //   }
  // }
  // const getFishAllowance = async () => {
  //   if (web3 && account && chainId && tokenAmounts[4] > 0) {
  //     const _fishAllowance = await FishInTheBlockchainLandWrapper?.allowance();
  //     setFishAllowance(String(Number(_fishAllowance) / 10 ** 18) || "0");
  //   }
  // }
  

  // useEffect(() => {
  //   getWoodAllowance();
  //   getRockAllowance();
  //   getClayAllowance();
  //   getWoolAllowance();
  //   getFishAllowance();
  // });

  useEffect(() => {
    console.log(tokenAmounts);
  }, [tokenAmounts]);

  // Function to add a new token to the tokensOffered state
  const handleAddTokenOffered = () => {
    const newToken = { id: tokensOffered.length + 1, token: "", amount: 0 };
    setTokensOffered([...tokensOffered, newToken]);
    // console.log(newToken);
  };

  // Function to add a new token to the tokensWanted state
  const handleAddTokenWanted = () => {
    const newToken = { id: tokensWanted.length + 1, token: "", amount: 0 };
    setTokensWanted([...tokensWanted, newToken]);
    // console.log({newToken, tokensWanted});
    
  };


  // Function to handle changes in the tokensOffered state
  const handleTokenOfferedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensOffered.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensOffered(updatedTokens);
    console.log(updatedTokens);
    
  };


  // Function to handle changes in the tokensWanted state
  const handleTokenWantedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensWanted.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensWanted(updatedTokens);

  }

  // Function to handle form submission
  const handleSubmitOffer = useCallback(async () => {
    // Validate the form inputs before submitting
    if (tokensOffered.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token offered fields.");
      return;
    }
    if (tokensWanted.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token wanted fields.");
      return;
    }

    //console.log(tokensOffered)
    //console.log(tokensWanted)

    
    // Create an array to store the ordered Offered tokens

    const newOfferedData = Array(5).fill(undefined); // Create an array with 5 undefined elements
    // console.log(tokensOffered);

    for (let i = 0; i < tokensOffered.length; i++) {
      if (tokensOffered[i].token === "WOOD") {
        newOfferedData[0] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "ROCK") {
        newOfferedData[1] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "CLAY") {
        newOfferedData[2] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "WOOL") {
        newOfferedData[3] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "FISH") {
        newOfferedData[4] = tokensOffered[i].amount;
      }
      // console.log(newOfferedData);
    }

    setTokensOfferedData(newOfferedData);

    // Create an array to store the ordered Wanted tokens


    const newWantedData = Array(5).fill(undefined); // Create an array with 5 undefined elements

    for (let i = 0; i < tokensWanted.length; i++) {
      if (tokensWanted[i].token === "WOOD") {
        newWantedData[0] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "ROCK") {
        newWantedData[1] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "CLAY") {
        newWantedData[2] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "WOOL") {
        newWantedData[3] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "FISH") {
        newWantedData[4] = tokensWanted[i].amount;
      }
      // console.log(newWantedData);
    }

    setTokensWantedData(newWantedData);
    console.log(tokensWantedData)

    const newTokenAmounts = Array(10).fill(undefined);

    for (let i = 0; i < tokensOfferedData.length; i++) {
      newTokenAmounts[i] = tokensOfferedData[i]
      //console.log(tokenAmounts);
    }


    for (let i = 0; i < tokensWantedData.length; i++) {
      newTokenAmounts[i + 5] = tokensWantedData[i]
      //console.log(tokenAmounts);
    }

    for (let i = 0; i < 10; i++) {
      if (typeof newTokenAmounts[i] === "undefined") {
        newTokenAmounts[i] = 0;
        //console.log(tokenAmounts);
      }
    }
    setTokenAmounts(newTokenAmounts);
    // console.log(newTokenAmounts);

    console.log(tokenAmounts);
    


    const tokenAmountsTuple = tokenAmounts as [number, number, number, number, number, number, number, number, number, number];
    console.log(tokenAmountsTuple);


  }

  // Function to handle form submission
  const handleCreateOffer = useCallback(async () => {
    // Validate the form inputs before submitting
    if (tokensOffered.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token offered fields.");
      return;
    }
    if (tokensWanted.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token wanted fields.");
      return;
    }


    // Create an array to store the ordered Offered tokens

    for (let i = 0; i < tokensOffered.length; i++) {
      if (tokensOffered[i].token === "WOOD") {
        tokensOfferedData[0] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "ROCK") {
        tokensOfferedData[1] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "CLAY") {
        tokensOfferedData[2] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "WOOL") {
        tokensOfferedData[3] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "FISH") {
        tokensOfferedData[4] = tokensOffered[i].amount;
      }
    }
    console.log(tokensOfferedData);

    // Create an array to store the ordered Wanted tokens

    for (let i = 0; i < tokensWanted.length; i++) {
      if (tokensWanted[i].token === "WOOD") {
        tokensWantedData[0] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "ROCK") {
        tokensWantedData[1] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "CLAY") {
        tokensWantedData[2] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "WOOL") {
        tokensWantedData[3] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "FISH") {
        tokensWantedData[4] = tokensWanted[i].amount;
      }
    }
    //console.log(tokensWantedData);
    

    //console.log(tokensOfferedData)
    //console.log(tokensWantedData)

    for (let i = 0; i < tokensOfferedData.length; i++) {
      tokenAmounts[i] = tokensOfferedData[i]
    }


    for (let i = 0; i < tokensWantedData.length; i++) {
      tokenAmounts[i + 5] = tokensWantedData[i]
    }

    for (let i = 0; i < 10; i++) {
      if (typeof tokenAmounts[i] === "undefined") {
        tokenAmounts[i] = 0;
      }
    }
    console.log(tokenAmounts);

    const tokenAmountsTuple = tokenAmounts as [number, number, number, number, number, number, number, number, number, number];
    //console.log(tokenAmountsTuple);

    if (web3 && account && chainId) {
      setLoading(true);
      tradeOfferWrapper
        ?.makeOffer(...tokenAmountsTuple)
        .then(() => {
          alert("Offer created successfully!");
        })
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }

    // Reset the form after submission
    setTokensOffered([{ id: 1, token: "", amount: 0 }]);
    setTokensWanted([{ id: 1, token: "", amount: 0 }]);
  }, [web3, account, tokensOffered, tokensWanted, tradeOfferWrapper]);

  // Function to connect to XDCPay
  const handleConnectXDCPay = useCallback(() => {
    connect();
  }, [connect]);

  // Function to disconnect from the wallet
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleApproveWood = () => {
    if (web3 && account && chainId) {

      if (tokenAmounts[0] > 0) {
        WoodInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Wood Approved!");
          })
          .then(() => {
            window.location.reload();            
          })
      }
    }
  }

  const handleApproveRock = () => {
    if (web3 && account && chainId) {
      if (tokenAmounts[1] > 0) {
        RockInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Rock Approved!");
          })
          .then(() => {
            window.location.reload();            
          })
      }
    }
  }

  const handleApproveClay = () => {
    if (web3 && account && chainId) {
      if (tokenAmounts[2] > 0) {
        CLAYInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Clay Approved!");
          })
          .then(() => {
            window.location.reload();            
          })
      }
    }
  }

  const handleApproveWool = () => {
    if (web3 && account && chainId) {
      if (tokenAmounts[3] > 0) {
        WoolInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Wool Approved!");
          })
          .then(() => {
            window.location.reload();            
          })
      }
    }
  }

  const handleApproveFish = () => {
    if (web3 && account && chainId) {
      if (tokenAmounts[4] > 0) {
        FishInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Fish Approved!");
          })
          .then(() => {
            window.location.reload();            
          })
      }
      

    }
  }

  // Function to initiate the trade
  const initiateTrade = useCallback(
    async (offerId: number) => {
      try {
        // Perform the necessary steps to initiate the trade
        console.log("Initiating trade for offer ID:", offerId);

  //       // Update the offer status to "In Progress" or any other desired value
  //       const updatedOffers = openOffers.map((offer) =>
  //         offer.id === offerId ? { ...offer, status: "In Progress" } : offer
  //       );
  //       setOpenOffers(updatedOffers);

  //       // Optional: Interact with a contract or perform additional logic
  //       // Declare and define the tradeOffer variable
  //       // const tradeOffer: TradeOffer | undefined = undefined; 
  //       // if (tradeOffer) {
  //       //   // Perform the tradeOffer action here
  //       //   await tradeOffer.performTrade(offerId);
  //       // }

  //       // Sign the transaction
  //       const signature = await signer.sign("Hello, World!");

        // Perform any necessary UI updates or display a success message to the user
        console.log("Trade initiated successfully");
      } catch (error) {
        // Handle errors
        console.error("Error initiating trade:", error);
        // Display an error message to the user
      }
    },
    [openOffers, signer]
  );

  return (
    <main className="main">
      <div className="button-container">
        {!account ? (
          <button className="addbtn connect" onClick={handleConnectXDCPay}>Connect XDCPay</button>
        ) : (
          <button onClick={handleDisconnectWallet}>Disconnect</button>
        )}
      </div>
      <div className="container">
        {/* Open Offers */}
        <div className="open-offers">
          <h2>Marketplace Offers (List of Open Offers)</h2>
          {querriedOffers.length > 0 ? (
            <ul>
              {querriedOffers
                .filter((offer) => typeof offer === "object" && offer !== null) // Filter out inconsistent elements
                .map((offer) => (
                  <li key={offer.id}>
                    <strong>Offer Id: {offer.id}</strong>
                    <p>{offer.offerString}</p>
                    <p>Your Offer: {offer.offerCrreator}</p>
                    {/* <p>Date: {offer.date}</p>
                    <p>Time: {offer.time}</p> */}
                    <button onClick={() => handleSubmitOffer()}>TRADE</button>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No open offers available.</p>
          )}
        </div>


        {/* Tokens Offered */}
        <div>
          {tokensOffered.map((token) => (
            <div key={token.id} className="token-wrapper">
              <h3>Amount</h3>
              <input
                type="number"
                value={token.amount}
                onChange={(e) =>
                  handleTokenOfferedChange(token.id, "amount", e.target.value)
                }
              />
              <h3>Tokens Offered</h3>
              <select
                value={token.token}
                onChange={(e) =>
                  handleTokenOfferedChange(token.id, "token", e.target.value)
                }
              >
                <option value="">Select Token</option>
                <option value="WOOD">WOOD</option>
                <option value="ROCK">ROCK</option>
                <option value="CLAY">CLAY</option>
                <option value="WOOL">WOOL</option>
                <option value="FISH">FISH</option>
              </select>
            </div>
          ))}

          <button className="addbtn" onClick={handleAddTokenOffered}>Add Another</button>

          {/* Tokens Wanted */}
          {tokensWanted.map((token) => (
            <div key={token.id} className="token-wrapper">
              <h3>Amount</h3>
              <input
                type="number"
                value={token.amount}
                onChange={(e) =>
                  handleTokenWantedChange(token.id, "amount", e.target.value)
                }
              />
              <h3>Tokens Wanted</h3>
              <select
                value={token.token}
                onChange={(e) =>
                  handleTokenWantedChange(token.id, "token", e.target.value)
                }
              >
                <option value="">Select Token</option>
                <option value="WOOD">WOOD</option>
                <option value="ROCK">ROCK</option>
                <option value="CLAY">CLAY</option>
                <option value="WOOL">WOOL</option>
                <option value="FISH">FISH</option>
              </select>
            </div>
          ))}

      <button onClick={handleAddTokenWanted}>Add Another</button>

      {/* Create Offer button
      <button id="create-offer" onClick={handleSubmit}>
        CREATE OFFER TO TRADE
      </button> */}

      {/* {(tokenAmounts[0] > 0)? (
        <button id="create-offer" onClick={handleApproveWood}>
          APPROVE WOOD
        </button>
      ) : (
        <button id="create-offer" onClick={handleSubmit}>
          CREATE OFFER TO TRADE
        </button>
      )} */}

      
        
      <button id="create-offer" onClick={
        // OfferSubmitted === false ? handleSubmitOffer :
        // tokenAmounts[0] > 0 ? handleApproveWood :
        // tokenAmounts[1] > 0 ? handleApproveRock :
        // tokenAmounts[2] > 0 ? handleApproveClay :
        // tokenAmounts[3] > 0 ? handleApproveWool :
        // tokenAmounts[4] > 0 ? handleApproveFish :
        // handleCreateOffer
        ()=>{
          console.log(tokenAmounts)
        }
        
      }
        >
        {OfferSubmitted === false ? 'Submit Offer' : 
        tokenAmounts[0] > 0 ? 'APPROVE WOOD' : 
        tokenAmounts[1] > 0 ? 'APPROVE ROCK' : 
        tokenAmounts[2] > 0 ? 'APPROVE CLAY' : 
        tokenAmounts[3] > 0 ? 'APPROVE WOOL' : 
        tokenAmounts[4] > 0 ? 'APPROVE FISH' : 
        'CREATE OFFER'}
      </button>





      {/* Open Offers */}
      <div className="open-offers">
        <h2>Marketplace Offers (List of Open Offers)</h2>
        {openOffers.length > 0 ? (
          <ul>
            {openOffers.map((offer) => (
              <li key={offer.id}>
                <strong>Offer #{offer.id}</strong>
                <p>
                  Tokens Offered: {offer.tokensOffered
                    .map((token) => `${token.amount} ${token.token}`)
                    .join(", ")}
                </p>
                <p>
                  Tokens Wanted: {offer.tokensWanted
                    .map((token) => `${token.amount} ${token.token}`)
                    .join(", ")}
                </p>
                <p>Status: {offer.status}</p>
                <p>Creator: {offer.creator}</p>
                <p>Date: {offer.date}</p>
                <p>Time: {offer.time}</p>
                <button onClick={() => initiateTrade(offer.id)}>TRADE</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No open offers available.</p>
        )}
      </div>
    </main>
  );
};

export default App;
