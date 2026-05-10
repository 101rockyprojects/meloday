export function parseRoute(url) {
    const location = url ? { pathname: url, search: '' } : window.location;
    let videoId = null;
    let day = null;
    let isSpecialDate = false;

    const basePath = '/meloday/';
    let path = location.pathname;

    if (location.pathname.startsWith(basePath)) {
        path = location.pathname.slice(basePath.length);
    }

    const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    const watchPattern = /^watch\/([a-zA-Z0-9_-]{11})$/;
    const watchQueryMatch = location.search.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    const dayMatch = location.search.match(/[?&]day=([0-9]{2}-[0-9]{2})/);
    const songMatch = location.search.match(/[?&]song=([a-zA-Z0-9_-]{11})/);
    const specialDateMatch = location.search.match(/[?&]special/);

    if (watchQueryMatch) {
        videoId = watchQueryMatch[1];
    } else if (songMatch) {
        videoId = songMatch[1];
    } else if (watchPattern.test(path)) {
        videoId = path.match(watchPattern)[1];
    } else if (videoIdPattern.test(path)) {
        videoId = path;
    }

    if (dayMatch) {
        day = dayMatch[1];
    }

    if (specialDateMatch) {
        isSpecialDate = true;
    }

    return { videoId, day, isSpecialDate };
}