import { AppProps } from 'next/app';
import { ClientProviders } from '@/components/providers/client-providers';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProviders>
      <Component {...pageProps} />
    </ClientProviders>
  );
}