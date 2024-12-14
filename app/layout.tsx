import { Nunito } from "next/font/google";
import './globals.css';
import Navbar from "./components/navbar/Navbar";
import Client from "./components/Client";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToastProvider";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RentalModal from "./components/modals/RentalModal";
import SearchModal from "./components/SearchModal";

// Metadata for SEO
export const metadata = {
  title: 'Elite Fields Properties',
  description:
    'Elite Fields Properties is a premier real estate agency dedicated to offering personalized property services across residential and commercial sectors. We assist clients in buying, selling, and renting properties with tailored support, market expertise, and a commitment to satisfaction. With an extensive network and deep knowledge of the local real estate market, Elite Fields Properties ensures a seamless and rewarding property journey. Trust us to guide you in finding your ideal property and investment opportunities.',
  openGraph: {
    title: 'Elite Fields Properties',
    description: 'Elite Fields Properties is a premier real estate agency dedicated to offering personalized property services across residential and commercial sectors. We assist clients in buying, selling, and renting properties with tailored support, market expertise, and a commitment to satisfaction. With an extensive network and deep knowledge of the local real estate market, Elite Fields Properties ensures a seamless and rewarding property journey. Trust us to guide you in finding your ideal property and investment opportunities.',
    url: 'https://www.elitefields.site',
    siteName: 'Elite Fields Properties',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Elite Fields Properties Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Client>
          <ToasterProvider />
          <SearchModal />
          <RentalModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </Client>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
