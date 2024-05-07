"use client";

import {Loading} from "@/components/shared/Loading";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {cn} from "@/lib/utils";

import {zodResolver} from "@hookform/resolvers/zod";
import {useAction} from "convex/react";
import {ConvexError} from "convex/values";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {useUser} from "@clerk/nextjs";
import {ShieldX} from "lucide-react";
import PendingInvites from "@/components/settings/PendingInvites";
import AccessRecords from "@/components/settings/AccessRecords";

const formSchema = z.object({
  email: z.string().min(2).max(50),
});

const page = () => {
  const [sendingInvite, setSendingInvite] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const addInvite = useAction(api.invite.sendInvite);
  const pathname = usePathname();
  const planId = pathname.split("/")[2];
  const {toast} = useToast();
  const {user} = useUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSendingInvite(true);
    const email = user?.emailAddresses[0].emailAddress;

    if (email && email === values.email) {
      toast({
        variant: "destructive",
        description: (
          <div className="font-sans flex justify-start items-center gap-1">
            <ShieldX className="h-5 w-5 text-white" />
            You can not invite yourself to join this Plan
          </div>
        ),
      });
      form.reset();
      setSendingInvite(false);
      return;
    }

    if (!planId || planId.length == 0) return;

    try {
      await addInvite({
        email: values.email,
        planId: planId as Id<"plan">,
      });
    } catch (error) {
      if (error instanceof ConvexError) {
        const msg = error.data as string;
        toast({
          title: "Error",
          description: msg,
          variant: "destructive",
        });
      }
    }
    form.reset();
    setSendingInvite(false);
  };

  return (
    <div className="py-6">
      <div className="bg-white shadow-sm rounded-lg p-4 border-2 border-gray-100">
        <div className="border-b-2 border-b-gray-100 pb-2 mb-2 font-bold">Collaborators</div>
        <p className="text-sm text-gray-600">
          To invite people to your travel plan, send them a email invite using below
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-5 max-w-xl">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={sendingInvite}
                      type="email"
                      placeholder="your-co-worker@example.com"
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="outline"
              size="sm"
              disabled={sendingInvite}
              className={cn("text-white hover:text-white bg-blue-500 hover:bg-blue-700")}
            >
              {sendingInvite ? (
                <div className="flex justify-center items-center gap-2">
                  <Loading className="w-4 h-4" /> Sendin Invite...
                </div>
              ) : (
                "Invite"
              )}
            </Button>
          </form>
        </Form>
        <PendingInvites planId={planId} />
        <AccessRecords planId={planId} />
      </div>
    </div>
  );
};

export default page;
