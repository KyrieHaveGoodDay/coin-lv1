"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ticker: z.string().min(2, {
    message: "ticker must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  link: z.string().optional(),
  discord: z.string().optional(),
  telegramLink: z.string().optional(),
})


export default function Home() {
  const [file, setFile] = useState(null);
  const [option, setOption] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currency, setCurrency] = useState('');

  const handleImageClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput?.click(); 
  };
  // 处理图片文件选择
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(file)
  };



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDialogOpen(false);
    setIsAlertOpen(true)
  }

  function handleButtonClick() {
    console.log('currency', currency)
  }

  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* <Button variant="default">Open</Button> */}
        <DialogTrigger >
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Launch coin</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                  <div className="block gap-4 sm:flex">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">Name</FormLabel>
                          <FormControl className="mt-3">
                            <Input placeholder="shadcn" className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ticker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">Ticker</FormLabel>
                          <FormControl className="mt-3">
                            <Input placeholder="shadcn" className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">Description</FormLabel>
                          <FormControl className="mt-3">
                            <Textarea className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormItem>
                      <FormLabel className="font-bold ">Image</FormLabel>
                      <FormControl className="mt-3">
                        <img src="/images/Rectangle.png" className="cursor-pointer" onClick={handleImageClick} alt="pic" />
                      </FormControl>
                      <Input type="file" id="fileInput" className="hidden"
                        onChange={handleFileChange} />
                    </FormItem>
                  </div>
                  <div className="text-bgBlue font-bold cursor-pointer"
                    onClick={() => setOption(prevOption => !prevOption)}
                  >Show more options</div>

                  {option && <div className="sm:flex block gap-4">
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">X link</FormLabel>
                          <FormControl className="mt-3">
                            <Input placeholder="shadcn" className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discord"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">Discord</FormLabel>
                          <FormControl className="mt-3">
                            <Input placeholder="shadcn" className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telegramLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold ">Telegram link</FormLabel>
                          <FormControl className="mt-3">
                            <Input placeholder="shadcn" className="text-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>}



                  <Button type="submit" className="bg-bgBlue w-full">
                    Submit
                  </Button>
                </form>
              </Form>
              <div className="mt-3">When your coin completes its bonding curve you receive 0.5 SUI</div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* isAlertOpen */}
      <AlertDialog open={isAlertOpen}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between">
              <span>How many you want to buy?</span>
              <span className="text-gray-500" onClick={() => setIsAlertOpen(false)}>X</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              It’s optional but buying a small amount of coins helps protect your coin from snipers
              <div className="flex gap-2 mt-3 justify-end">
                <span>Switch to TEST</span>
                <img src="/images/arrow.png" />
              </div>
              <div className="flex my-3 gap-3">
                <Input type="number" placeholder="SUI" value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-black" />
                <div className="flex items-center">
                  <span className="text-black">SUI</span>
                  <img src="/images/icon_sui.png" />
                </div>
              </div>
              <div>You receive: 9744325.5411 TEST</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel> */}
            <AlertDialogAction className="w-full bg-bgBlue" onClick={() => {
              setIsAlertOpen(false)
              handleButtonClick()
            }}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
