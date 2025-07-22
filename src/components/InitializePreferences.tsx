"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setDarkMode, setCategories, setMovieGenres, setMusicGenres } from "../features/user/userSlice"

export default function InitializePreferences() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Read dark mode
      const darkPref = localStorage.getItem("DASHBOARD_DARK") === "1"
      dispatch(setDarkMode(darkPref))

      // Read news categories
      const categoriesJSON = localStorage.getItem("dashboard_categories")
      if (categoriesJSON) {
        const categories = JSON.parse(categoriesJSON)
        dispatch(setCategories(categories))
      }

      // Read movie genres
      const movieGenresJSON = localStorage.getItem("dashboard_movieGenres")
      if (movieGenresJSON) {
        const movieGenres = JSON.parse(movieGenresJSON)
        dispatch(setMovieGenres(movieGenres))
      }

      // Read music genres (new!)
      const musicGenresJSON = localStorage.getItem("dashboard_musicGenres")
      if (musicGenresJSON) {
        const musicGenres = JSON.parse(musicGenresJSON)
        dispatch(setMusicGenres(musicGenres))
      }
    }
  }, [dispatch])

  return null
}
