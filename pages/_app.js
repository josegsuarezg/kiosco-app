import '../styles/globals.css'
import {KioscoProvider} from '../context/KioscoProvider'

function MyApp({ Component, pageProps }) {
  return (
      <KioscoProvider>
        <Component {...pageProps} />
      </KioscoProvider>
    );
}

export default MyApp
