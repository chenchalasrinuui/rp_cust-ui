"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { appStore } from "@/redux/appStore/appStore";
import { Provider } from "react-redux";
import { AppContextProvider } from "@/context/appContext";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
