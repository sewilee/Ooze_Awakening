class Input{
    constructor(){
        this.downkeys = [];
        document.onkeydown = (e) => {
            this.downkeys[e.code] = true;
        };
        document.onkeyup = (e) => {
            this.downkeys[e.code] = false;
        };
    }

    isKeyDown(keyCode){
        return this.downkeys[keyCode];
    }
}

export default Input;