"use client";

import PlanMetaData from "@/components/sections/PlanMetaData";
import {TooltipContainer} from "@/components/shared/Toolip";
import {Info} from "lucide-react";
import Image from "next/image";
import { useState,useEffect } from "react";

type ImageSectionProps = {
  userPrompt: string | undefined;
  imageUrl: string | null | undefined;
  placeName: string | undefined;
  isLoading: boolean;
  allowEdit: boolean;
  companion: string | undefined;
  activityPreferences: string[];
  fromDate: number | undefined;
  toDate: number | undefined;
  planId: string;
};

const ImageSection = ({
  userPrompt,
  imageUrl,
  placeName,
  isLoading,
  allowEdit,
  companion,
  activityPreferences,
  fromDate,
  toDate,
  planId,
}: ImageSectionProps) => {

  const [placeImageUrl,setPlaceImageUrl] = useState<string>("https://images.unsplash.com/photo-1427694012323-fb5e8b0c165b?q=80&w=2978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")


  console.log("ima");
  
  async function searchUnsplashImageUrl(): Promise<void> {
   
    const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY; // Use NEXT_PUBLIC_ prefix for Next.js

    if (!userPrompt) {
      console.error("No user prompt available.");
      return;
    }

    const userP = `${userPrompt},show popular tourist destinations`

    const url = `https://api.unsplash.com/search/photos?query=${userP}&client_id=${apiKey}&per_page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setPlaceImageUrl(data.results[2].urls?.regular); 
        console.log(placeImageUrl);
        
      // Update image URL state
      } else {
        console.error("No images found for this query.");
      }
    } catch (error: any) {
      console.error(`Error fetching image: ${error.message}`);
    }
  }

useEffect(() => {
  if (userPrompt) {
    searchUnsplashImageUrl();
  }
}, [userPrompt]);
  
  return (

    
    <article
      id="imagination"
      className="
                flex flex-col gap-1 scroll-mt-20"
    >
      
      
      {
        placeImageUrl && (
          <>
            <div className="relative w-full overflow-hidden h-[300px] md:h-[400px] flex items-end">
              <Image
                src={placeImageUrl}
                alt="Image for the place"
                sizes="100vw"
                className="w-full rounded-t-md object-cover z-0"
                fill
                priority={true}
              />
              <div className="px-5 py-2 z-10 relative flex justify-between w-full bg-black/40">
                <h2 className="text-2xl text-white font-bold tracking-wide text-balance text-left">
                  {placeName}
                </h2>
                <div className="rounded-md w-fit ml-8">
                  <p className="text-white text-balance  text-right">"{userPrompt}"</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-1 justify-end">
                {!allowEdit && (
                  <div className="bg-foreground rounded-full">
                    <TooltipContainer text="This is a community shared travel plans.">
                      <Info className="text-background cursor-pointer" />
                    </TooltipContainer>
                  </div>
                )}
                <PlanMetaData
                  allowEdit={allowEdit}
                  companion={companion}
                  activityPreferences={activityPreferences}
                  fromDate={fromDate}
                  toDate={toDate}
                  planId={planId}
                />
              </div>
            </div>
          </>
        )
      }
    </article>
  );
};

export default ImageSection;
