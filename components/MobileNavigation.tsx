"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
  SheetDescription,
  SheetFooter,
  SheetOverlay,

} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { signOutUser } from "@/lib/actions/user.actions";
import FileUploader from "./FileUploader";

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
   ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
    <Image src="/assets/icons/logo-full-brand.svg" alt="mobile navigation icon"
    height={120} width={50} className="h-auto"/>
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <Image src="/assets/icons/menu.svg" alt="menu" height={30} width={30}   
    />
  </SheetTrigger>
  <SheetContent className=" shad-sheet h-screen px-3">
    <SheetHeader>
      <SheetTitle >
        <div className="header-user ">
          <Image src="/assets/icons/menu.svg" alt="avatar" width={44} height={44} className="header-user-avatar"/>
          <div className="sm:hidden lg:block">
          <p className="subtitle-1 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
          </div>
        </div>
       <Separator className="mb-4 bg-green-200/20"/>
      </SheetTitle>
     <nav className="mobile-nav">
      <ul className="mobile-nav-list">
      {
    navItems.map(({url,name,icon})=>(
           <Link key={name} href={url} className="lg:w-full">
            <li className={cn( "mobile-nav-item",
                  pathname === url && "shad-active",)}>
                <Image src={icon} alt={name} width={24} height={24}
                className={cn("nav-icon" , pathname===url&& "nav-icon-active")}/>
                <p >{name}</p>
            </li>
           </Link>
    ))
}
      </ul>
     </nav>
     <Separator className="mb-4 bg-green-200/20"/>
     <div className="flex flex-col justify-between gap-5">
   <FileUploader ownerId={ownerId} accountId={accountId} />
    <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
     </div>
    </SheetHeader>
  </SheetContent>
</Sheet>

    </header>
  )
}

export default MobileNavigation;