class Timer{
    constructor(durationInput, startButton, pauseButton,callback,){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callback){
            this.onstart=callback.onstart;
            this.onTick=callback.onTick;
            this.onComplete=callback.onComplete;
        }
    
        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    }

    start = () => {
        if(this.onstart){
            this.onstart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick,50);
    };
    pause=()=>{
        clearInterval(this.interval);
    }


    tick=()=>{
       
        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        } else{
            this.timeRemaining = this.timeRemaining -.05;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
       
    };

    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2); 
    }

} 
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton,{

onstart(totalDuration) {
    duration=totalDuration;

},
onTick(timeRemaining) {
    
    circle.setAttribute('stroke-dashoffset',
        perimeter * timeRemaining / duration - perimeter
    
    )
   
},
onComplete(){
   console.log('Timer is compleated'); 
}

});