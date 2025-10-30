import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "@/assets/tweetle_logo.svg";
import Link from "./Link";
import type { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({selectedPage, setSelectedPage}: Props) => {
  const { isAuthenticated,logout } = useAuth0();
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <nav>
      <div className={`items-center justify-between max-w-4xl mx-auto w-full fixed top-0 left-0 right-0 z-50 bg-gray-20 `}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <img alt="logo" src={Logo} />
            {/* RIGHT SIDE */}
            {isAboveMediumScreens ? ( 
              <div className={`${flexBetween} w-full`}>
                {/* LINKS */}
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link 
                    page="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link 
                    page="Profile"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
                {/* SIGN IN */}
                {isAuthenticated ? (
                  <div className={`${flexBetween} gap-8`}>
                    <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors" 
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
                  </div>
                ) : (
                  <div className={`${flexBetween} gap-8`}>
                    <p>Sign In</p>
                  </div>
                )}
              </div>) : (
                <button
                  className="rounded-full bg-secondary-500 h-10 w-10 border-none"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Bars3Icon className="h-6 w-6 text-white"/>
                </button>
              )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar