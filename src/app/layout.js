"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { appStore } from "@/redux/appStore/appStore";
import { Provider } from "react-redux";
import { AppContextProvider } from "@/context/appContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <AppContextProvider>
            <Header />
            {children}
            <Footer />
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
