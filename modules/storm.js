export default class Storm {
    constructor(p, container, id) {
        this._container = container;
        this._player = new Vimeo.Player(container, {
            id: id,
            width: p.width,
            controls: false,
            loop: true,
        });
    }

    play() {
        this._container.style.display = "block";
        this._player.play();
    }

    pause() {
        this._player.pause();
    }

    destroy() {
        this._container.innerHTML = "";
    }
}