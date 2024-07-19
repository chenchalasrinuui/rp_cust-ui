"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { appStore } from "@/redux/appStore/appStore";
import { Provider, useSelector } from "react-redux";
import { AppContextProvider } from "@/context/appContext";
const inter = Inter({ subsets: ["latin"] });
import { LayoutWarpper } from "./layoutWarpper";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <AppContextProvider>
            <LayoutWarpper >
              {children}
            </LayoutWarpper>
          </AppContextProvider>
        </Provider>
      </body>
    </html>
  );
}
