"use client";

import Link from "next/link";

import Pulse from "@/components/shared/Pulse";
import {Button} from "@/components/ui/button";
import {usePlanContext} from "@/contexts/PlanContextProvider";

import {planSections} from "@/lib/constants";

import {useMemo} from "react";

const Sidebar = ({
  planId,
  isMobile = false,
  isPublic,
}: {
  planId: string;
  isMobile?: boolean;
  isPublic: boolean;
}) => {
  const {planState} = usePlanContext();

  const sections = useMemo(() => {
    if (isPublic) return planSections.filter((section) => section.isPublic === isPublic);
    else return planSections;
  }, [planSections, isPublic]);

  return (
    <aside className="space-y-6 sticky top-[5.6rem] bg-red-100 w-full p-10 h-fit rounded-md
    ">
      <div className="space-y-2">
        <h2 className="mb-2 md:text-lg text-base font-semibold tracking-tight">Your Plan</h2>
        <div className="flex flex-col">
          {sections.map((section) => (
            <Link
              href={`/plans/${planId}/${isPublic ? "community-plan" : "plan"}#${section.id}`}
              key={section.id}
            >
              <Button
                aria-label={section.name}
                variant="ghost"
                className="w-full 
                          flex justify-start items-start
                          gap-2 whitespace-break-spaces px-2
                          text-foreground dark:text-muted-foreground hover:dark:text-foreground"
              >
                {section.icon}
                <span className="text-left">{section.name}</span>
                {!isPublic && !isMobile && planState && !planState[section.id] && <Pulse />}
              </Button>
            </Link>
          ))}
        </div>
      </div>
     
    </aside>
  );
};

export default Sidebar;
