import React from 'react'
import Container from './Container'
import {navbarConfig, NavItem} from "../../config/Navbar";
import { Link } from 'next-view-transitions';
import { ThemeToggleButton } from '@/components/common/ThemeSwitch';
import Image from 'next/image';
import { TrackedLink } from './TrackedLink';

const Navbar = () => {
  return (
    <Container className="sticky top-0 z-50 mt-5 rounded-md backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-4">
          <TrackedLink href="/">
            <Image
              className="h-10 w-10 rounded-md border border-border bg-blue-300 object-cover transition-all duration-300 ease-in-out hover:scale-90 dark:bg-yellow-300"
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={navbarConfig.logo.width}
              height={navbarConfig.logo.height}
              loading="eager"
            />
          </TrackedLink>
          <div className="flex items-center justify-center gap-4">
            {navbarConfig.navItems.map((item: NavItem) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-md font-medium text-gray-700 transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  )
}

export default Navbar