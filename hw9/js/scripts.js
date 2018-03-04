class VideoPlayer{
    constructor() {
        this.player = document.querySelector('.player');
        this.video = this.player.querySelector('.viewer');
        this.progress = document.querySelector('.progress');
        this.progressBar = this.progress.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player__slider');
        this.properties = JSON.parse(localStorage.getItem('myVideo')) || {currentTime: 0, playbackRate: 1, volume: 1};
    }

    init() {
        //start plugin
        this.events();
        this.getProp();
    }

    events() {
        //all events
        this.video.addEventListener('click', e => this.togglePlay());
        this.toggle.addEventListener('click', e => this.togglePlay());
        this.ranges.forEach(range => range.addEventListener('change', e => {this.handleRangeUpdate(e); this.saveProp()}));
        this.ranges.forEach(range => range.addEventListener('mousemove', e => this.handleRangeUpdate(e)));
        this.skipButtons.forEach(btn => btn.addEventListener('click', e => this.skip(e)));
        this.video.addEventListener('timeupdate', e => {this.progressMove(); this.saveProp()});
        this.progress.addEventListener('click', e => this.chooseMoment(e));
    }

    togglePlay() {
        //play/pause video
        const method = this.video.paused ? 'play' : 'pause';

        this.toggle.textContent = this.video.paused ? '❚ ❚' : '►';
        this.video[method]();
    }

    handleRangeUpdate(e) {
        this.video[e.target.name] = e.target.value;
    }

    skip(e) {
        // time skip
        this.video.currentTime += parseFloat(e.target.dataset.skip);
    }

    progressMove() {
        this.progressBar.style.flexBasis = (this.video.currentTime / this.video.duration) * 100 + '%';
    }

    chooseMoment(e) {
        let width = parseInt(getComputedStyle(this.progress).width);
        this.video.currentTime = this.video.duration * e.offsetX / width;
    }

    saveProp() {
        this.properties.currentTime = this.video.currentTime;
        this.properties.playbackRate = this.video.playbackRate;
        this.properties.volume = this.video.volume;

        let serialProp = JSON.stringify(this.properties);
        localStorage.setItem('myVideo', serialProp);
    }

    getProp() {
        this.video.currentTime = this.properties.currentTime;
        this.video.playbackRate = this.properties.playbackRate;
        this.video.volume = this.properties.volume;
        this.ranges.forEach(range => range.value = this.properties[range.name]);
    }

}

const video = new VideoPlayer();
video.init();