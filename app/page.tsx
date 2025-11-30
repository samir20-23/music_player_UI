"use client"
import Menu from "./components/menu";
import React, { useEffect, useRef, useState } from "react"
import './main.css'

const songs = [
  { title: "Travis Scott - FE!N ft. Playboi Carti", artist: "Travis Scott", src: "./song1.mp3", img: "./scott.png" },
  { title: "Travis Scott - HIGHEST IN THE ROOM (Official Music Video)", artist: "Travis Scott", src: "./song2.mp3", img: "./scott2.png" },
  { title: "Kendrick Lamar - HUMBLE.", artist: "Kendrick Lamar", src: "./song3.mp3", img: "./humble3.png" }
]

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [currentBg, setCurrentBg] = useState(songs[0].img)
  const [prevBg, setPrevBg] = useState<string | null>(null)
  const [showPrevBg, setShowPrevBg] = useState(false)

  const [isFading, setIsFading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const clearPrevTimeoutRef = useRef<number | null>(null)
  const changeSongTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (clearPrevTimeoutRef.current) window.clearTimeout(clearPrevTimeoutRef.current)
      if (changeSongTimeoutRef.current) window.clearTimeout(changeSongTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateSlider = () => {
      setSliderValue((audio.currentTime / (audio.duration || 1)) * 100 || 0)
    }
    audio.addEventListener("timeupdate", updateSlider)
    return () => audio.removeEventListener("timeupdate", updateSlider)
  }, [currentSong])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const changeSong = (direction: "next" | "prev") => {
    const newIndex = direction === "next"
      ? (currentSong + 1) % songs.length
      : (currentSong - 1 + songs.length) % songs.length

    setPrevBg(currentBg)
    setShowPrevBg(true)

    setIsFading(true)

    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setIsPlaying(false)
    setSliderValue(0)

    changeSongTimeoutRef.current = window.setTimeout(() => {
      setCurrentSong(newIndex)
      setCurrentBg(songs[newIndex].img)

      setIsFading(false)

      clearPrevTimeoutRef.current = window.setTimeout(() => {
        setShowPrevBg(false)
        setPrevBg(null)
      }, 700)
    }, 300)
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(e.target.value)
    audio.currentTime = (audio.duration || 1) * (value / 100)
    setSliderValue(value)
  }

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  if (!mounted) return null

  return (
    <div className="main">
      {prevBg && (
        <div
          className="bgLayer prev"
          style={{ backgroundImage: `url(${prevBg})`, opacity: showPrevBg ? 1 : 0 }}
          aria-hidden
        />
      )}
      <div
        className="bgLayer current"
        style={{ backgroundImage: `url(${currentBg})`, opacity: showPrevBg ? 0 : 1 }}
        aria-hidden
      />

      <div className="bgOverlay" aria-hidden />

      <div className="mainCard">
        <div className="nav">
          {showMenu && <Menu onClose={() => setShowMenu(false)} />}
          <div><i className="fa-solid fa-chevron-left"></i></div>
          <div><p>{songs[currentSong].artist}</p></div>
          <div><i className="fa-solid fa-ellipsis-vertical" onClick={toggleMenu}></i></div>
        </div>
 
        <div className="playCard">
          <div className="imgPlay">
            <img
              src={songs[currentSong].img}
              alt="cover"
              className={`cover ${isFading ? "fade" : ""}`}
            />
            <div className="hoverImg">

            </div>
            <div className={`titleTrack ${isPlaying ? "playing" : ""}`}>

              <p style={{ backgroundImage: `url(${songs[currentSong].img})` }}
                aria-hidden >

                {songs[currentSong].title}</p>

              <p>{songs[currentSong].title}</p>
              <span>{songs[currentSong].artist}</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSlider}
              className="progress-slider"
              style={{
                background: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(132, 126, 121, 0.3) ${sliderValue}%, rgba(161,155,149,0.3) ${sliderValue}%, rgba(161,155,149,0.3) 100%)`
              }}
            />


          </div>

          <div className="controllCard">
            <i className="fa-solid fa-shuffle" id='shuffle' onClick={() => changeSong("next")}></i>
            <i className="fa-solid fa-backward" id='backward' onClick={() => changeSong("prev")}></i>
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`} id='play' onClick={togglePlay}></i>
            <i className="fa-solid fa-forward" id='forward' onClick={() => changeSong("next")}></i>
            <div className="circle"></div>

          </div>
        </div>

        <audio ref={audioRef} src={songs[currentSong].src} />
      </div>


    </div>
  )
}