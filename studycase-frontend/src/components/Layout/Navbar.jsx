import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
         {
            navItems && navItems.map((i,index) => (
                <div className="flex" key={index}>
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-black 800px:text-[#fff]" : "text-black 800px:text-[#fff]"} 800px:pb-0 font-[500] px-6 cursor-pointer py-3 w-full hover:bg-[#9c9ee9] 800px:hover:bg-[hsl(27,96%,53%)]`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar