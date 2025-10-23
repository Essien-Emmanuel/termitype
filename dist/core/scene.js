export class Scene {
    timeout;
    cancelSetTimout;
    constructor() {
        this.timeout = 0;
        this.cancelSetTimout = false;
    }
    init(_arg) { }
    async update(_key) {
        return { nextScene: "" };
    }
    render() { }
}
