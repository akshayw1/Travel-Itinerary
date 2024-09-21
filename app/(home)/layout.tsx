import type {Metadata} from "next";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "WanderAtlan - Your Smart Travel Planner",
    template: "%s | WanderAtlan - Your Smart Travel Planner",
  },
  description:
    "WanderAtlan provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
  keywords:
    "travel planner, AI travel planner, smart travel, travel suggestions, destination insights, personalized itineraries, trip planning, travel tips, vacation planning",
  openGraph: {
    title: "WanderAtlan - Your Smart Travel Planner",
    description:
      "WanderAtlan provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
    url: "http://localhost:3000",
    type: "website",
    siteName: "WanderAtlan",

  },
};


export default function RootLayout({children}: {children: React.ReactNode}) {
  
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center bg-red-50/40">
        {children}
      </main>
    </>
  );
}
