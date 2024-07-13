import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
// import "@/styles/styles.scss";
import "../styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
// import ModalCart from "@/components/Modal/ModalCart";
import ModalCart from "../components/Modal/ModalCart";
// import ModalWishlist from "@/components/Modal/ModalWishlist";
import ModalWishlist from "../components/Modal/ModalWishlist";
// import ModalSearch from "@/components/Modal/ModalSearch";
import ModalSearch from "../components/Modal/ModalSearch";
// import ModalQuickview from "@/components/Modal/ModalQuickview";
import ModalQuickview from "../components/Modal/ModalQuickview";
// import ModalCompare from "@/components/Modal/ModalCompare";
import ModalCompare from "../components/Modal/ModalCompare";
// import CountdownTimeType from "@/type/CountdownType";
import CountdownTimeType from "../type/CountdownType";
// import { countdownTime } from "@/store/countdownTime";
import { countdownTime } from "../store/countdownTime";

const serverTimeLeft: CountdownTimeType = countdownTime();

const instrument = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanh",
  description: "For the Gods amongst Men",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={instrument.className}>
          {children}
          <ModalCart serverTimeLeft={serverTimeLeft} />
          <ModalWishlist />
          <ModalSearch />
          <ModalQuickview />
          <ModalCompare />
        </body>
      </html>
    </GlobalProvider>
  );
}
