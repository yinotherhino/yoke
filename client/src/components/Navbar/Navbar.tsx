import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { AllContext } from "../../context/types";
import { AuthButton } from "../Buttons/Buttons";
import style from "./navbar.module.css";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
  const { handleLogout, changeForm } = useContext(DataContext) as AllContext;
  const [showMenu, setShowMenu] = useState("hide");

    const handleMenu = ()=>{
        showMenu==="hide" ? setShowMenu("show") : setShowMenu("hide")
    }

  return (
    <div className={style["nav-container"]}>
      <div>
        <Link to="/" placeholder="YOKE">
          YOKE
        </Link>
      </div>
      <div className={ style["auth-container"] }>
        <AuthButton text="Login" onClick={() => changeForm("login")} />
        <AuthButton text="Signup" onClick={() => changeForm("signup")} />
        <span className={style["logout"]} onClick={handleLogout}>
          Logout
        </span>
      </div>

      <div className={style["small-screen"] }>
        <AiOutlineLogin onClick={handleMenu} />
        <div className={style["small-screen-auth"] + " " + style[showMenu] }>
            <div>
                <AuthButton text="Login" onClick={() => changeForm("login")} />
            </div>
            <div>
                <AuthButton text="Signup" onClick={() => changeForm("signup")} />
            </div>
            <div>
                <span className={style["logout"]} onClick={handleLogout}>
                Logout
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
