// Create an array to store player instances
var players = [];

// Find all video elements
var videoElements = document.querySelectorAll('.video-js');

// Lazy load function to set video source and initialize player
function lazyLoadVideo(videoElement) {
  // Set the video src attribute
  var videoSrc = videoElement.getAttribute('data-src');
  if (videoSrc) {
    videoElement.setAttribute('src', videoSrc);
  }

  // Set the track src attributes
  var trackElements = videoElement.getElementsByTagName('track');
  for (var i = 0; i < trackElements.length; i++) {
    var trackSrc = trackElements[i].getAttribute('data-src');
    if (trackSrc) {
      trackElements[i].setAttribute('src', trackSrc);
    }
  }

  // Initialize Video.js player
  var player = videojs(videoElement, {
    controlBar: {
      loadEvent: 'play',
      children: ['playToggle', 'skipBackward', 'skipForward', 'volumePanel', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'descriptionsButton', 'subsCapsButton', 'hlsQualitySelector', 'QualitySelector', 'pictureInPictureToggle', 'fullscreenToggle'],
      skipButtons: {
        forward: 10,
        backward: 10
      },
      volumePanel: { 
        inline: false
      },
    },
    inactivityTimeout: 0,
    preload: "metadata",
    autoplay: "", // for autoplay "muted"
    controls: true,
    responsive: true,
    fluid: true,
    liveui: true,
    nativeTextTracks: false,
    language: '',
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
    techOrder: ["html5"],
    html5: {}
  });

  players.push(player);

  // Add event listener to pause other videos when one is played
  player.on('play', function() {
    players.forEach(function(p) {
      if (p !== player) {
        p.pause();
      }
    });
  });
}

// Initialize Intersection Observer for lazy loading
var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      lazyLoadVideo(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

// Observe each video element
videoElements.forEach(function(videoElement) {
  observer.observe(videoElement);
});


