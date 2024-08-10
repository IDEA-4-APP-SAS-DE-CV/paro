"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {Switch} from "@nextui-org/react";
import {MoonIcon} from "./icons/MoonIcon";
import {SunIcon} from "./icons/SunIcon";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <Switch
        defaultSelected
        size="lg"
        color="secondary"
        thumbIcon={({ isSelected, className }) => {
          if (isSelected) {
            setTheme('light')
            return <SunIcon className={className} />;
          } else {
            setTheme('dark')
            return <MoonIcon className={className} />;
          }
        }}
    >
      Dark mode
    </Switch>
    </div>
  )
};