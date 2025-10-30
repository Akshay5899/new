import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Safe
import '../styles/globals.css';                // ✅ Your custom CSS

import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // ✅ Bootstrap JS only on the client
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('✅ Bootstrap JS loaded');
      })
      .catch((err) => {
        console.error('❌ Bootstrap JS failed to load', err);
      });
  }, []);

  return <Component {...pageProps} />;
}
