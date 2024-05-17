import '@/styles/globals.css'
import { ThemeContextProvider } from '@/context/ThemeContext'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import AppLayout from '@/modules/AppLayout'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

//@ts-ignore
export const fetcher = (...args) =>
  //@ts-ignore
  fetch(...args).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('404')
    }
  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeContextProvider>
        <AppLayout>
          <style jsx global>{`
            html {
              font-family: ${roboto.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeContextProvider>
    </SWRConfig>
  )
}
