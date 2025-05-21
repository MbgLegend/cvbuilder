"use client"

import { Coins, Crown, FileText, LayoutDashboard, LoaderCircle, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import SignIn from './modals/SignIn'
import { useAppContext } from '@/context/AppContext'
import SignUp from './modals/Signup'
import { signOut, useSession } from "next-auth/react"
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

const Navbar = ({ padx }) => {
    const { data:session, status } = useSession()
    const { showSignIn, showSignUp, openSignIn, openSignUp } = useAppContext()
    const router = useRouter()

    return (
        <>
            <nav 
                className={`bg-white shadow-sm flex justify-between gap-[2rem] items-center h-[55px] ${padx}`}
            >
                <Link href="/" className='flex items-center gap-[0.5rem] select-none'>
                    <FileText className="h-8 w-8 text-[var(--main-color)]" />
                    <span className="ml-2 text-[1.025rem] md:text-xl font-bold text-gray-900">CV builder</span>
                </Link>
                {status === "loading" ? (
                    <LoaderCircle className="animate-spin text-[var(--main-color)]" />
                ) : (
                    status === "unauthenticated" || !session?.user ? (
                        <div className='flex items-center gap-[1rem]'>
                            <button 
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                                onClick={openSignIn}
                            >
                                Sign In
                            </button>
                            <button 
                                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[var(--main-color)] rounded-md hover:shadow-lg"
                                onClick={openSignUp}
                            >
                                Get Started
                            </button>
                        </div>
                    ) : (
                        <div className='flex items-center gap-[1.25rem] relative'>
                            {/* Credits Display */}
                            {session?.user.plan === "pro" ? 
                                (
                                    <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-full">
                                        <Crown className="h-5 w-5 text-[var(--main-color)] mr-2" />
                                        <span className="text-[var(--main-color)] font-medium text-[0.875rem]">
                                            Pro
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-full">
                                        <Coins className="h-5 w-5 text-[var(--main-color)] mr-2" />
                                        <span className="text-[var(--main-color)] font-medium text-[0.875rem]">
                                            {session?.user.credits} credits
                                        </span>
                                    </div>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Image 
                                        src={session.user.image}
                                        alt='user'
                                        width={36}
                                        height={36}
                                        className='rounded-[50%] cursor-pointer select-none object-cover'
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="absolute right-[-14px] top-1 w-52">
                                    <DropdownMenuLabel className="flex flex-col gap-1">
                                        <span className='text-[0.825rem] font-[600]'>
                                            {session?.user.fullName.length > 40 ? session?.user.fullName.slice(0, 40) + '...': session?.user.fullName}
                                        </span>
                                        <span className='text-[0.695rem] text-neutral-600'>
                                            {session?.user.email.length > 28 ? session?.user.email.slice(0, 28) + '...' : session?.user.email}
                                        </span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem 
                                            className="cursor-pointer text-[0.815rem]"
                                            onClick={() => router.push("/dashboard")}
                                        >
                                            <LayoutDashboard />
                                            Dashboard
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="cursor-pointer text-[0.815rem]"
                                            onClick={signOut}
                                        >
                                            <LogOut />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                )}
            </nav>
            {status !== "loading" && showSignIn && <SignIn />}
            {status !== "loading" && showSignUp && <SignUp />}
        </>
    )
}

export default Navbar