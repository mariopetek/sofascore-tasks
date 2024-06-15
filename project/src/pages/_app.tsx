import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import AppLayout from '@/modules/AppLayout'
import { Roboto } from 'next/font/google'
import Head from 'next/head'
import { ThemeContextProvider } from '@/context/ThemeContext'
import { LanguageContextProvider } from '@/context/LanguageContext'
import { DateContextProvider } from '@/context/DateContext'
import { TracnkedEventsContextProvider } from '@/context/TrackedEventsContext'
import { SearchDialogContextProvider } from '@/context/SearchDialogContext'

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
      <TracnkedEventsContextProvider>
        <ThemeContextProvider>
          <DateContextProvider>
            <LanguageContextProvider>
              <SearchDialogContextProvider>
                <AppLayout>
                  <style jsx global>{`
                    html {
                      font-family: ${roboto.style.fontFamily};
                    }
                  `}</style>
                  <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    <title>Mini Sofascore</title>
                  </Head>
                  <Component {...pageProps} />
                </AppLayout>
              </SearchDialogContextProvider>
            </LanguageContextProvider>
          </DateContextProvider>
        </ThemeContextProvider>
      </TracnkedEventsContextProvider>
    </SWRConfig>
  )
}
