import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [musicContainer, setMusicContainer] = useState();
  const [progressContainer, setProgressContainer] = useState();
  const [audio, setAudio] = useState();
  const [progress, setProgres] = useState(0);
  const [cover, setCover] = useState();
  const [title, setTitle] = useState("");
  const [play, setPlay] = useState(false);
  const [currTime, setCurrTime] = useState();
  const [durTime, setDurTime] = useState();

  // Song titles
  const songs = ["hey", "summer", "ukulele"];
  // Keep track of song
  let songIndex = 0;
  useEffect(() => {
    setCurrTime(document.querySelector("#currTime"));
  }, [currTime]);
  useEffect(() => {
    setDurTime(document.querySelector("#durTime"));
  }, [durTime]);
  useEffect(() => {
    setMusicContainer(document.getElementById("music-container"));
  }, [musicContainer]);
  useEffect(() => {
    setProgressContainer(document.getElementById("progress-container"));
  }, [progressContainer]);
  useEffect(() => {
    setAudio(document.getElementById("audio"));
    setCover(document.getElementById("cover"));
    if (audio) {
      loadSong(songs[0]);
    }
  }, [audio]);
  useEffect(() => {
    console.log(title);
  }, [title]);

  useEffect(() => {
    setProgres(document.getElementById("progress"));
  }, [progress]);

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  // Set progress bar
  function setProgress(e) {
    console.log(e);
    // const width = e.target.width;
    // const clickX = e.offsetX;
    // const duration = audio.target.duration;
    // console.log("clicked", (clickX / width) * duration);
    // audio.currentTime = (clickX / width) * duration;
  }
  //get duration & currentTime for Time of song
  function DurTime(e) {
    const { duration, currentTime } = e.target;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? "0" + min : min;

    // define seconds currentTime
    function get_sec(x) {
      if (Math.floor(x) >= 60) {
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
            sec = Math.floor(x) - 60 * i;
            sec = sec < 10 ? "0" + sec : sec;
          }
        }
      } else {
        sec = Math.floor(x);
        sec = sec < 10 ? "0" + sec : sec;
      }
    }

    get_sec(currentTime, sec);

    // change currentTime DOM
    currTime.innerHTML = min + ":" + sec;

    // define minutes duration
    let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
    min_d = min_d < 10 ? "0" + min_d : min_d;

    function get_sec_d(x) {
      if (Math.floor(x) >= 60) {
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
            sec_d = Math.floor(x) - 60 * i;
            sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
          }
        }
      } else {
        sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
        sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
      }
    }

    // define seconds duration

    get_sec_d(duration);

    // change duration DOM
    durTime.innerHTML = min_d + ":" + sec_d;
    updateProgress(e);
  }
  const handlePlayPause = () => {
    if (audio) {
      if (audio.paused) {
        audio.play();
        setPlay(true);
      } else {
        audio.pause();
        setPlay(false);
      }
    }
  };
  function loadSong(song) {
    setTitle(song);
    audio.src = `./assets/music/${song}.mp3`;
    cover.src = `./assets/img/${song}.jpg`;
  }
  // Next
  function handleNext() {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    loadSong(songs[songIndex]);

    setPlay(true);
    audio.play();
  }
  // Previous song
  function handlePrevious() {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    audio.play();
    setPlay(true);
  }
  function getDuration(e) {
    // console.log(e.target.currentTime);
  }
  return (
    <>
      <h1>Music Player</h1>
      <div
        className={play ? "music-container play" : "music-container"}
        id="music-container"
      >
        <div className="music-info">
          <h4 id="title">{title}</h4>
          <div className="progress-container" id="progress-container">
            <div className="progress" id="progress" onClick={setProgress}></div>
          </div>
        </div>

        <audio
          src="./assets/music/ukulele.mp3"
          id="audio"
          // onTimeUpdate={DurTime}
          onTimeUpdate={getDuration}
          onEnded={handleNext}
        ></audio>

        <div className="img-container">
          <img src="./assets/img/ukulele.jpg" alt="music-cover" id="cover" />
        </div>
        <div className="navigation">
          <button id="prev" className="action-btn" onClick={handlePrevious}>
            <i className="fas fa-backward"></i>
          </button>
          <button
            id="play"
            className="action-btn action-btn-big"
            onClick={handlePlayPause}
          >
            <i className={play ? "fas fa-pause" : "fas fa-play "}></i>
          </button>
          <button id="next" className="action-btn" onClick={handleNext}>
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
