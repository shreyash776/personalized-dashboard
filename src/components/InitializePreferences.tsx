"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setDarkMode, setCategories, setMovieGenres } from "../features/user/userSlice"

export default function InitializePreferences() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Read dark mode
      const darkPref = localStorage.getItem("DASHBOARD_DARK") === "1"
      dispatch(setDarkMode(darkPref))

    }
  }, [dispatch])

  return null
}
