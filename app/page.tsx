import './main.css'
export default function App() {
  return (
    <div className="main">
      <div className="mainCard">
        <div className="nav">
          <div >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <div>
            <p>Travis Scott</p>
          </div>
          <div>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>

        </div>
        <div className="playCard">
          <div className="imgPlay">
            <img src="./scott.png" alt="" />
            <div className="titleTrack">
              <p>FE!N (feat. Playboi Carti)</p>
              <span>Travis Scott</span>
            </div>
            <input type="range" min="0" max="100" value="40" className="progress-slider" />

          </div>
          <div className="controllCard">
            <i className="fa-solid fa-shuffle" id='shuffle'></i>
            <i className="fa-solid fa-backward" id='backward'></i>
            <i className="fa-solid fa-play" id='play'></i>
            <i className="fa-solid fa-forward" id='forward'></i>
            <div className="circle"></div>

          </div>

        </div>
      </div>
    </div>
  )
}