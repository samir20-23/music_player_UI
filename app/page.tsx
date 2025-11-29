"use client"

import React, { useState, useEffect, useRef } from "react"
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
  const audioRef = useRef<HTMLAudioElement>(null)
 
  useEffect(() => {
    setMounted(true)
  }, [])
 
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateSlider = () => setSliderValue((audio.currentTime / audio.duration) * 100 || 0)
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
    setCurrentSong(prev => {
      if (direction === "next") return (prev + 1) % songs.length
      else return (prev - 1 + songs.length) % songs.length
    })
    setIsPlaying(false)
    setSliderValue(0)
  }

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(e.target.value)
    audio.currentTime = (audio.duration * value) / 100
    setSliderValue(value)
  }

  if (!mounted) return null  
  return (
    <div className="main">
      <div className="mainCard">
        <div className="nav">
          <div><i className="fa-solid fa-chevron-left"></i></div>
          <div><p>Travis Scott</p></div>
          <div><i className="fa-solid fa-ellipsis-vertical"></i></div>
        </div>

        <div className="playCard">
          <div className="imgPlay">
            <img src={songs[currentSong].img} alt="cover" />
            <div className="titleTrack">
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
            />
          </div>

          <div className="controllCard">
            <i className="fa-solid fa-shuffle" id='shuffle'></i>
            <i className="fa-solid fa-backward" id='backward' onClick={() => changeSong("prev")}></i>
            <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`} id='play' onClick={togglePlay}></i>
            <i className="fa-solid fa-forward" id='forward' onClick={() => changeSong("next")}></i>
            <div className="circle"></div>
          </div>
        </div>

        <audio ref={audioRef} src={songs[currentSong].src}></audio>
      </div>
    </div>
  )
}
