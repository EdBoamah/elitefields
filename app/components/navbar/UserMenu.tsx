'use client';
import { useCallback, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { User } from "@prisma/client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRental";

interface UserMenuProps{
    currentUser?: User | null
}
const UserMenu:React.FC<UserMenuProps> = ({

  currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []); 
    const onRent = useCallback(()=>{
       if(!currentUser){
        return loginModal.onOpen();
       }
    rentModal.onOpen();
    },[currentUser,loginModal,rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
                   
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-blue-500
                    transition
                    cursor-pointer
                    "
                >
                    Get listed
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    flex
                    flex-row
                    items-center
                    border-neutral-100
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="
                absolute
                rounded-xl
                shadow-md
                w-[40vw]
                md:w-3/4
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                             <MenuItem 
                                onClick={()=>router.push('/')}
                                label="Home"
                            />
                            <MenuItem 
                                onClick={()=>router.push('/favourites')}
                                label="My favourites"
                            />
                            <MenuItem
                                    onClick={() => router.push("/reservations")}
                                    label="My reservations"
                                />
                            <MenuItem 
                                onClick={()=>router.push("/properties")}
                                label="My properties"
                            />
                            <MenuItem 
                                onClick={()=>onRent()}
                                label="Get listed"
                            />
                            <hr />
                            <MenuItem 
                                onClick={()=>router.push('/about')}
                                label="About"
                            />
                            <MenuItem 
                                onClick={()=>router.push('/contact')}
                                label="Contact Us"
                            />
                            <MenuItem 
                                onClick={()=>signOut()}
                                label="Logout"
                            />
                           
                            </>
                         

                        ):(
                        <>
                        <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenuItem 
                            onClick={registerModal.onOpen}
                            label="Sign Up"
                        />
                        </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
