class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
        background-color:white;
        box-shadow:0pc 0pc 10pc 2pc black`;
        container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.path = [];
        this.isDrawing = false;

        this.#addEventListener();
    }

    #addEventListener() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt)
            this.path = [mouse];
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt)
                this.path.push(mouse)
            }
        }
        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }
    }


    #redraw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        draw.path(this.ctx,this.path)
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top),
        ];
    }
}