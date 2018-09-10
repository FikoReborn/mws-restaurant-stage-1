let swUrl;

location.hostname === 'fikoreborn.github.io' ? swUrl = '/mws-restaurant-stage-1/sw.js' : swUrl = '/sw.js';

if (navigator.serviceWorker) {
  navigator.serviceWorker.register(swUrl).then(function (reg) {
    console.log("Registration worked!");
  });
}
