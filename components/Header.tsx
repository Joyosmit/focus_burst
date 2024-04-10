//@ts-nocheck
import { Button } from "@/components/ui/button"
import { ClerkLoaded, ClerkLoading, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Loader } from "lucide-react"

const Header = () => {
    return (
        <div className="w-[80%] h-20 bg-rose-600 flex justify-between">
            <p className="w-10 h-10">Hello</p>
            <ClerkLoading>
                <Loader className="w-10 h-10 animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedOut>
                    <SignUpButton
                    mode="modal">
                        <Button>
                            Sign Up bro
                        </Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </ClerkLoaded>
        </div>
    )
}

export default Header
