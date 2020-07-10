// This Starter Kit workshop is designed for you to create the foundation for your next project! You've had a bit of time to get familiar with object oriented JavaScript. Now let’s build a Jukebox!
//
// You will build a music player that will end up playing any mp3 you can find online. Think about what functionality you might need for this to work. Encapsulate all of this functionality in a JavaScript object so that starting a song is as simple as calling Jukebox.play() You need an array of song objects and the ability to play, stop and pause a song. How would you switch songs? Can you shuffle songs? Focus on getting the JavaScript to work and keep the HTML/CSS minimal, make it work before you make it look good!
//
// Hint: The next project you will be able to continue styling this Jukebox and API integration.

function Song(audiosrc, name) {
  this.audiosrc = audiosrc;
  this.name = name;
}

function Jukebox(){
  this.songs = [];
  this.songsName = [];
  this.songNum = 0;
  this.currentSongTime = 0;
}

Jukebox.prototype.addSong = function(song) {
  this.songs.push(song.audiosrc);
  this.songsName.push(song.name);
}

Jukebox.prototype.play = function(){
  // Checks for first time play
  if(jukebox.currentTime == 0){
    jukebox.src = this.songs[this.songNum];
  }
  console.log(this.songs[this.songNum]);
  jukebox.play();
}

Jukebox.prototype.pause = function() {
  jukebox.pause();
  // remember pause time for resuming
  this.currentSongTime = jukebox.currentTime;
  console.log(this.currentSongTime);
}

Jukebox.prototype.next = function() {
  // checks if current song is last song
  if(this.songNum == this.songs.length-1) {
    this.songNum = 0;
  } else {
    this.songNum += 1;
  }
  jukebox.currentTime = 0;
}

Jukebox.prototype.previous = function() {
  if(this.songNum == 0) {
    this.songNum = this.songs.length-1;
  } else {
    this.songNum -= 1;
  }
  jukebox.currentTime = 0;
}

Jukebox.prototype.shuffle = function() {
  var randomSong = Math.floor(Math.random() * (this.songs.length));
  this.songNum = randomSong;
  jukebox.currentTime = 0;
}

var song1 = new Song('audio/BeethovenMoonlight1.mp3', 'Beethoven Moonlight 1');
var song2 = new Song('audio/Bagatelle1.mp3', 'Bagatelle No1');
var song3 = new Song('audio/Emperor.mp3', 'Emperor');
var song4 = new Song('audio/BeethovenRondo51_1.mp3', 'Beethoven Rondo OP51:1');
var song5 = new Song('http://www.download2mp3.com/beethoven_htm_files/BeethovenPeasantDance.mp3', 'Beethoven Peasant Dance');
var theJukebox = new Jukebox();
theJukebox.addSong(song1);
theJukebox.addSong(song2);
theJukebox.addSong(song3);
theJukebox.addSong(song4);
theJukebox.addSong(song5);

var jukebox = document.getElementById('jukebox');
var play = document.getElementById('play');
var pause = document.getElementById('pause');
var next = document.getElementById('next');
var previous = document.getElementById('previous');
var shuffle = document.getElementById('shuffle');
var audioCurrent = document.getElementById('audioCurrent');
var audioLength = document.getElementById('audioLength');
var nowplaying = document.getElementById('mp3src');
var playlistContainer = document.querySelector('#playlist-container');
var playlist = document.getElementById('playlist');
var playlistArr = playlist.getElementsByTagName('li');
var iconLeft = document.querySelector('#iconLeft');
var iconRight = document.querySelector('#iconRight');

// Controls event handlers
jukebox.addEventListener('ended', function() {
  // Sets autoplay on song finish
  theJukebox.next();
  theJukebox.play();
  playlistHighlight();
})

play.addEventListener('click', function() {
  // Play button onclick
  theJukebox.play();
  nowPlaying();
  playlistHighlight();
  play.style.color = 'rgb(255, 246, 18)';
  pause.style.color = 'white';
});

pause.addEventListener('click', function() {
  // Pause button onclick
  theJukebox.pause();
  pause.style.color = 'rgb(255, 246, 18)';
  play.style.color = 'white';
})

next.addEventListener('click', function() {
  // Next button onclick
  theJukebox.next();
  theJukebox.play();
  nowPlaying();
  playlistHighlight();
  play.style.color = 'rgb(255, 246, 18)';
  pause.style.color = 'white';
})

previous.addEventListener('click', function() {
  theJukebox.previous();
  theJukebox.play();
  nowPlaying();
  playlistHighlight();
  play.style.color = 'rgb(255, 246, 18)';
  pause.style.color = 'white';
})

shuffle.addEventListener('click', function() {
  while(true){
    var currentSongNum = theJukebox.songNum;
    theJukebox.shuffle();
    var newSongNum = theJukebox.songNum;
    if(currentSongNum != newSongNum) {
      break;
    }
  }
  theJukebox.play();
  nowPlaying();
  playlistHighlight();
  play.style.color = 'rgb(255, 246, 18)';
  pause.style.color = 'white';
})

function setVolume() {
  jukebox.volume = document.getElementById('volume1').value;
}

function progressBar() {
  var currentMinutes = Math.floor(jukebox.currentTime/60);
  var currentSeconds = Math.floor((jukebox.currentTime) - (currentMinutes*60));
  var lengthMinutes = Math.floor(jukebox.duration/60);
  var lengthSeconds = Math.floor((jukebox.duration) - (lengthMinutes*60));
  // Conditional for setting current time on progress bar
  if(currentMinutes < 10) {
    if(currentSeconds < 10) {
      audioCurrent.innerHTML = '0'+currentMinutes+':0'+currentSeconds;
    } else {
      audioCurrent.innerHTML = '0'+currentMinutes+':'+currentSeconds;
    }
  } else if(currentSeconds < 10) {
    audioCurrent.innerHTML = currentMinutes+':0'+currentSeconds;
  } else {
    audioCurrent.innerHTML = currentMinutes+':'+currentSeconds;
  }
  // Conditional for setting length on progress bar
  if(lengthMinutes < 10) {
    if(lengthSeconds < 10) {
      audioLength.innerHTML = '0'+lengthMinutes+':0'+lengthSeconds;
    } else {
      audioLength.innerHTML = '0'+lengthMinutes+':'+lengthSeconds;
    }
  } else if(lengthSeconds < 10) {
    audioLength.innerHTML = lengthMinutes+':0'+lengthSeconds;
  } else {
    audioLength.innerHTML = lengthMinutes+':'+lengthSeconds;
  }

}

jukebox.addEventListener('timeupdate', function() {
  progressBar();
})

function nowPlaying(){
  nowplaying.innerHTML = theJukebox.songsName[theJukebox.songNum];
}

function getPlaylist() {
  // Function for generating playlist li elements
  for(x=0; x<theJukebox.songs.length; x++){
    var node = document.createElement('li');
    var textnode = document.createTextNode(theJukebox.songsName[x]);
    node.appendChild(textnode);
    playlist.appendChild(node);
  }
}

function playlistHighlight() {
  for(x=0; x<theJukebox.songs.length; x++){
    if(x != theJukebox.songNum){
      playlistArr[x].style.color = 'white';
      playlistArr[x].style.fontWeight = 'normal';
    }
  }
  playlistArr[theJukebox.songNum].style.color = 'rgb(255, 246, 18)';
  playlistArr[theJukebox.songNum].style.fontWeight = 'bolder';

}

getPlaylist();

iconLeft.addEventListener('click', function() {
  iconLeft.style.display = 'none';
  iconRight.style.display = 'inline-block';
  playlistContainer.style.right = '0px';
})

iconRight.addEventListener('click', function() {
  iconRight.style.display = 'none';
  iconLeft.style.display = 'inline-block';
  playlistContainer.style.right = '-400px';
})

// Adding audio form stuff


function formReset() {
  audioForm.reset();
}

var audioForm = document.getElementById('audioForm');
var addButton = document.querySelector('#addButton');

addButton.addEventListener('click', function(event) {
  var audioInput = document.getElementById('audioInput').value;
  var audioName = document.querySelector('#audioName').value;
  var newSong = new Song(audioInput, audioName);
  theJukebox.addSong(newSong);
  console.log(newSong);
  console.log(theJukebox.songsName[theJukebox.songsName.length-1]);
  var node = document.createElement('li');
  var textNode = document.createTextNode(theJukebox.songsName[theJukebox.songsName.length-1]);
  // console.log(theJukebox.songsName[theJukebox.songsName.length-1]);
  // tag.setAttribute('href', url);
  node.appendChild(textNode);
  playlist.appendChild(node);
})

// VISUALIZER JS
