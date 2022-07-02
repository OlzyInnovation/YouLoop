let video;

function getYouLoopSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z'
  );
  svg.appendChild(path);
  return svg;
}

// Init this whole thing!
function init() {
  setTimeout(videoElementPresent() ? addYouLoop : init, 500);
}

function videoElementPresent() {
  return document.querySelector('video') !== null;
}

function checkDOMChange() {
  // check for any new element being inserted here,
  // or a particular node being modified
  let skip = document.getElementsByClassName('ytp-ad-skip-button-icon')[0];
  let video = document.querySelector('video');

  if (!skip) {
    // call the function again after 100 milliseconds
    setTimeout(checkDOMChange, 500);
  } else {
    video.removeEventListener('timeupdate', track);
    skip.click();
    video.addEventListener('timeupdate', function () {
      if (video.currentTime > video.duration * 0.23) {
        // Reset the video to 0
        video.currentTime = 0;
        // And play again
        video.play();
      }
    });
  }
}
function addYouLoop() {
  sth();
}

function track() {
  if (video.currentTime > video.duration * 0.23) {
    // Reset the video to 0
    video.currentTime = 0;
    // And play again
    video.play();
  }
}

function sth() {
  let video = document.querySelector('video');
  video.addEventListener('timeupdate', function () {
    if (video.currentTime > video.duration * 0.23) {
      // Reset the video to 0
      video.currentTime = 0;
      // And play again
      video.play();
    }
  });

  checkDOMChange();
}

function addObserver() {
  const skip = document.getElementsByClassName('ytp-ad-skip-button-icon');
  if (skip.length > 0) skip[0].click();

  // new MutationObserver((mutations) => {
  //   mutations.forEach(() => {
  //     if (skip.length > 0) skip[0].click();
  //   });
  // }).observe(skip[0]);
}

init();
console.log('YouTube Looper Running...');
