import "./globals.css";

import { auth } from "@/auth";

// font-awesome.
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// react components.
import Header from "@/components/header/Header";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import Copyright from "@/components/footer/Copyright";

// database connection.
import { connectDatabase } from "@/services/mongo";

// providers.
import ToastProvider from "@/providers/ToastProvider";
import SessionProvider from "@/providers/SessionProvider";
import MainContextProvider from "@/providers/MainContextProvider";

// configuration.
import configs from "@/configs";

export const metadata = {
  metadataBase: new URL(configs.baseURL),
};

const RootLayout = async ({ children }) => {
  await connectDatabase();

  const session = await auth();

  return (
    <html lang="en">
      <body>
        <ToastProvider />
        <SessionProvider>
          <MainContextProvider>
            <Header />
            <Navbar />
            {children}
            <Footer />
            <Copyright />
          </MainContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
