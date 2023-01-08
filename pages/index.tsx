import { ConnectWallet, MediaRenderer, useActiveListings, useContract } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const {contract} = useContract(
    '0x7653Cd64320c65733C005EF855CdE916705B483D',
    'marketplace'
  )
  const {data: nfts, isLoading} = useActiveListings(contract);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="http://thirdweb.com/">SoundPhase</a>
        </h1>
        <ConnectWallet/>
        {!isLoading ? (
          <div>
            {nfts && nfts.map((nft) => {
              return (
                <div>
                  <MediaRenderer
                  src={nft.asset.image}
                  height="200px"
                  width="200px"
                  />
                  <p>{nft.asset.name}</p>
                  <p>Price: {nft.buyoutCurrencyValuePerToken.displayValue} MATIC</p>
                  <button
                    onClick={async () => {
                      try {
                        await contract?.buyoutListing(BigNumber.from(nft.id), 1); 
                      } catch (error) {
                        console.error(error); 
                        alert(error); 
                      }
                    }}
                  > Buy Now</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
};

export default Home;
