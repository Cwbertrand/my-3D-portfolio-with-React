import React, { useEffer, useState} from "react";
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {

  //state fields
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    //these classes are defined inside the style.js
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">

        {/* Logo and name for the navbar */}
        <Link to="/" className="flex items-center gap-2" onClick={()=> {
          
            //this keeps track of where we are in the page. We declare an empty string up
            setActive("");

            //When we click we have scroll to the top
            window.scrollTo(0, 0);
          }}>

          <img src={logo} alt="logo" className="w-9 h-9 object-contain"/>
          <p className="text-white text-[18px] foont-bold flex cursor-pointer">
            Cw Bertrand <span className="sm:block hidden">&nbsp; | Php and Js</span>
          </p>        
        </Link>

        {/* Links for the navbar and function when you click on the navlink it gets active using the setActive() */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
              <li key={link.id} 
                className={`${
                  active === link.title
                  ? 'text-white'
                    : 'text-secondary'
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
          ))}
        </ul>

        {/* burger menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu} 
            alt="burger_menu"
            className="w-[28px] h-[28px] cursor-pointer object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                  <li key={link.id} 
                    className={`${
                      active === link.title
                      ? 'text-white'
                        : 'text-secondary'
                    } font-poppins font-medium text-[16px] cursor-pointer`}
                    onClick={() => { 
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar