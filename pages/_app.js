// import { AppProps } from 'next/app';
import Head from 'next/head';

// import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
// import Notifications from '../components/Notification'

// require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



const c5ireChain = {
  id: 997,
  name: '5ireChain',
  network: '5ireChain',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: '5ire',
    symbol: '5ire',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.5ire.network'],
    },
  },
  blockExplorers: {
    default: { name: 'explorer', url: 'https://explorer.5ire.network' },
    etherscan: { name: 'explorer', url: 'https://explorer.5ire.network' },
  },
  testnet: false,
};
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum,c5ireChain],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = ({ Component, pageProps }) => {

    return (
        <>
          <Head>
            <title>5ireXPay</title>
          </Head>

          {/* <ContextProvider> */}

          <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <div className="flex flex-col h-screen">
              {/* <Notifications /> */}
              <AppBar/>
              <ContentContainer>
                <Component {...pageProps} />
              </ContentContainer>
              <Footer/>
            </div>
      </RainbowKitProvider>
    </WagmiConfig>
            
          {/* </ContextProvider> */}
        </>
    );
};

export default App;
