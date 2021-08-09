document.addEventListener("DOMContentLoaded", (event) => {

    const loadAnalytics = () => {
        if(typeof gtag !== "undefined"){
            gtag('config', 'G-WF9W9FMD0E', {'page_location': window.location.href});
        }
    }

    const handleBannerVideo = () => {
        // inspired from https://fynydd.com/blog/properly-handling-html5-video/
        const video = document.querySelector(".video-banner");
        if (video !== null) {
            // breakpoint is the minimum width from which to start playing the video (to avoid mobile data overload)
            const breakpoint = 1024;

            const getDocumentWidth = () => {
                return window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;
            }

            const enableFallbackPoster = () => {
                video.setAttribute('poster', video.getAttribute("data-fallback-poster"));
            }

            const enableLoadingPoster = () => {
                video.setAttribute('poster', video.getAttribute("data-loading-poster"));
            }

            const loadVideo = () => {
                const video = document.querySelector(".video-banner");

                // Remove existing source tags for mobile
                if (getDocumentWidth() < breakpoint + 1) {
                    enableFallbackPoster();
                    while (video.firstChild) {
                        video.removeChild(video.firstChild);
                    }
                }else{
                    enableLoadingPoster();
                }

                // Add source tags if not already present
                if (getDocumentWidth() > breakpoint) {
                    if (document.querySelectorAll(".video-banner > source").length < 1) {
                        const source1 = document.createElement('source');
                        const src = video.getAttribute("data-src");

                        source1.setAttribute('src', src);
                        source1.setAttribute('type', 'video/mp4');

                        video.appendChild(source1);
                    }

                    // Play the video
                    video.play();
                } else {
                    enableFallbackPoster();
                }
            }

            loadVideo();

            // Pause when page is not in the foreground
            window.addEventListener('blur', () => {
                video.pause();
            });

            // Play when page returns to the foreground
            window.addEventListener('focus', () => {
                if (getDocumentWidth() > breakpoint) {
                    video.play();
                } else {
                    enableFallbackPoster();
                }
            });

            // Play video when page resizes
            window.addEventListener('resize', () => {
                loadVideo();
            });

            // Play when page returns from browser history button
            window.addEventListener('popstate', () => {
                if (getDocumentWidth() > breakpoint) {
                    video.play();
                } else {
                    enableFallbackPoster();
                }
            });
        }
    }

    handleBannerVideo();
    loadAnalytics();

});
