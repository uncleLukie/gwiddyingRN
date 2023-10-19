// ==UserScript==
// @name         gwiddyingRN
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove YouTube's ad blocker popup and unpause the video
// @author       You
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to play the video
    const playVideo = () => {
        const ytPlayer = document.getElementById("movie_player");
        if (ytPlayer && ytPlayer.playVideo) {
            ytPlayer.playVideo();
        }
    };

    // Create an observer instance
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // Look for the popup element
            const popup = document.querySelector('tp-yt-paper-dialog[role="dialog"]');
            if (popup) {
                // Remove the popup element
                popup.parentNode.removeChild(popup);
                console.log('Ad Blocker Popup Removed.');

                // Unpause the video
                playVideo();
                console.log('Video Unpaused.');
            }
        });
    });

    // Configuration of the observer
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // Pass in the target node, as well as the observer options
    observer.observe(document.body, config);

})();