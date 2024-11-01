import platform from '../assests/platform.png'
import hills from '../assests/hills.png'
import background from '../assests/background.png'
import platformSmallTall from '../assests/platformSmallTall.png'
import spriteRunLeft from '../assests/spriteRunLeft.png'
import spriteRunRight from '../assests/spriteRunRight.png'
import spriteStandLeft from '../assests/spriteStandLeft.png'
import spriteStandRight from '../assests/spriteStandRight.png'
import home from '../assests/home.png'
import bgmSrc from '../assests/bgm.mp3'
import dieSrc from '../assests/die.wav'
import jumpSrc from '../assests/jump.mp3'
import warnSrc from '../assests/warn.wav'
import winSrc from '../assests/win.wav'
import longJumpSrc from '../assests/longJump.mp3';






const leftBtn = document.getElementById('left-btn');
const downBtn = document.getElementById('down-btn');
const rightBtn = document.getElementById('right-btn');
const upBtn = document.getElementById('up-btn');

const bgm = new Audio(bgmSrc);
const die = new Audio(dieSrc);
const jump = new Audio(jumpSrc);
const warn = new Audio(warnSrc);
const win = new Audio(winSrc);
const longJumpSound = new Audio(longJumpSrc);

let warningIntervalId;

bgm.loop = true; 
bgm.volume = 0.5; 



function playSound(sound) {
    sound.currentTime = 0; // Reset sound to start
    sound.play(); // Play the sound
}



function playWarning() {
    playSound(warn);
}

warningIntervalId = setInterval(playWarning, 15000);






const canvas= document.querySelector('canvas');

const c = canvas.getContext('2d');

console.log(platform)
canvas.width= 1024;
canvas.height= 576;
// console.log(c)

const gravity = 4.5



class Player{
    constructor(){
        this.speed= 10
        this.position={
            x:100,
            y:100
        }
        this.velocity={
            x:0,
            y:0
        }
        this.width=66;
        this.height=150;
        this.image = createImage(spriteStandRight)
        this.frames=0
        this.canJump = true;
        
        this.sprites ={
            stand:{
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth:177,
                width:66
               
               
            },
            run:{
                right:createImage(spriteRunRight),
                left:createImage(spriteRunLeft),
                cropWidth:341,
                width:127.875
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth= 177;
    }

    draw(){
        c.drawImage(this.currentSprite,
                    this.currentCropWidth * this.frames,
                    0,
                     this.currentCropWidth ,
                    400, 
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height)
    }

    update(){
        this.frames++
        if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite===this.sprites.stand.left)){
            this.frames = 0
        }
        else if(this.frames > 29   && 
            (this.currentSprite === this.sprites.run.right ||
             this.currentSprite === this.sprites.run.left)){
            this.frames = 0
        }
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        
        if(this.position.y +this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
    }
}

class Platform{
    constructor({x,y,image}){
        this.position ={
            x,
            y
        }
        this.image=image;
        this.width=image.width;
        this.height=image.height;
       
    }

    draw(){
        c.drawImage(this.image, this.position.x,this.position.y)
    }
}
class GenericObject{
    constructor({x,y,image}){
        this.position ={
            x,
            y
        }
        this.image=image;
        this.width=image.width;
        this.height=image.height;
       
    }

    draw(){
        c.drawImage(this.image, this.position.x,this.position.y)
    }
}

function createImage(imageSrc){
    const image =new Image ();
    image.src=imageSrc
    return image
}


let platformImage= createImage(platform);
let platformSmallTallImage=createImage(platformSmallTall);

let player =new Player()

let platforms= []
let genericObject= []
let lastKey;
let isGameWon = false;
let animationFrameId;
let hasInteracted = false; 


const Keys ={
    right:{
        pressed: false
    }
    ,
    left:{
        pressed: false
    }
}

let scrollOffset =0

function init(){

   
    if (!hasInteracted) {
        bgm.play(); // Attempt to play BGM on game init
    }


 platformImage= createImage(platform);


 player =new Player()

 platforms= [
    new Platform({x:platformImage.width *4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
        y:270,
        image:createImage(platformSmallTall)
    }),
    new Platform({x:platformImage.width *11 +3900,
        y:40,
        image:createImage(home)
    }),
    new Platform({x:platformImage.width *5 +1200 -2,
        y:348,
        image:platformImage
    }),
    new Platform({x:platformImage.width *5 +1500 -2,
        y:348,
        image:platformImage
    }),
    new Platform({x:platformImage.width *6 +1800 -2,
        y:348,
        image:platformImage
    }),
new Platform({
    x:-1,
    y :470,
    image:platformImage
}), 
new Platform({x:platformImage.width-3,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *2 +100,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *3 +300,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *4 +300 -2,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *5 +600 -2,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *5 +900 -2,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *7 +2100 -2,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *8 +2300 -2,
    y:350,
    image:platformImage
}),
new Platform({x:platformImage.width *9 +2500 -2,
    y:350,
    image:platformImage
}),
new Platform({x:platformImage.width *10 +2800 -2,
    y:300,
    image:platformImage
}),
new Platform({x:platformImage.width *10 +2700 ,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *11 +3000 ,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *11 +3300 ,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *11 +3600,
    y:470,
    image:platformImage
}),
new Platform({x:platformImage.width *11 +3900,
    y:470,
    image:platformImage
}),





]

 genericObject= [new GenericObject({
      x:-1,
      y:-1,
      image:createImage(background)
      
}),
new GenericObject({
    x:-1,
    y:-1,
    image:createImage(hills)
    
})]


 scrollOffset =0

}

function animate(){
    if (isGameWon) return;
    animationFrameId = requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)

    genericObject.forEach(genericObject =>{
        genericObject.draw()
    })
   
    platforms.forEach((platform) =>{

        platform.draw();
        
    })

    
    player.update();
    
    if(Keys.right.pressed && player.position.x < 400){
        player.velocity.x=player.speed
    }
    else if((Keys.left.pressed && player.position.x >100) ||
    (Keys.left.pressed && scrollOffset===0 && player.position.x >0)){
        player.velocity.x=-player.speed
    }
     else{

        player.velocity.x=0
        if(Keys.right.pressed){
             scrollOffset +=player.speed;
            platforms.forEach((platform) =>{
                platform.position.x -=player.speed
            })
            genericObject.forEach(genericObject =>{
                genericObject.position.x -=player.speed * .66;
            })
           
        }
        else if(Keys.left.pressed && scrollOffset >0){
            scrollOffset -=player.speed;
            platforms.forEach((platform) =>{
                platform.position.x +=player.speed
            })
            genericObject.forEach(genericObject =>{
                genericObject.position.x +=player.speed * .66;
            })
            
        }
    }

    

    platforms.forEach((platform) =>{
    if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height +player.velocity.y >=platform.position.y 
        && player.position.x + player.width >=platform.position.x 
        && player.position.x <= platform.position.x+platform.width )  {
        player.velocity.y=0;
    }
})

if (Keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right){
    player.frames=1
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth=player.sprites.run.cropWidth
    player.width= player.sprites.run.width;
} else if(Keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left ){
    player.frames=1
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth=player.sprites.run.cropWidth
    player.width= player.sprites.run.width;
}
else if(!Keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left ){
    player.frames=1
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth=player.sprites.stand.cropWidth
    player.width= player.sprites.stand.width;
}
else if(!Keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right ){
    player.frames=1
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth=player.sprites.stand.cropWidth
    player.width= player.sprites.stand.width;
}

// win condition
   if(scrollOffset > platformImage.width *11 +3500){
    playSound(win);
    showModal();
    isGameWon = true; // Stop further animation
    return;

    
   }



// loose condition
if(player.position.y > canvas.height){
    loose()
    }

}
init()
animate()


window.addEventListener('keydown', ({keyCode})=>{
    
    if (!hasInteracted) {
        bgm.play();
        hasInteracted = true; // Prevent further attempts to autoplay
    }

    // setInterval(playWarning, 15000);

    
    switch (keyCode){
        case 65:
            console.log('left')   
            Keys.left.pressed= true;
             lastKey ='left'
            break
        case 83:
            console.log('down')
            playSound(jump)         
            break
      
        case 68:
            console.log('Right')
            Keys.right.pressed= true;
            lastKey ='right'
            break

            case 87:
                console.log('up'+player.velocity.y)  
               
                if (player.canJump) {
                    player.velocity.y -= 30;  // Set jump strength here
                    playSound(longJumpSound);
                    player.canJump = false;  // Prevent further jumps until grounded
                }    
                break
        
    }
})
window.addEventListener('keyup', ({keyCode})=>{
    

    switch (keyCode){
        case 65:
            console.log('left')  
            Keys.left.pressed= false; 
           
            break
        case 83:
            console.log('down')         
            break
        case 68:
            console.log('Right')
            Keys.right.pressed= false;
            break
        
        case 87:
            console.log('up')  
            player.canJump = true;
            playSound(longJumpSound);     
            break
        
    }
})


// pop up

const showModal = () => {
    const win = document.querySelector('.modal__title');
    const winImg = document.querySelector('.modal__img');
    winImg.src="https://cdn3d.iconscout.com/3d/premium/thumb/star-trophy-4307685-3580548.png"
    win.innerHTML="You Win !";
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('show-modal');


    clearInterval(warningIntervalId);

    cancelAnimationFrame(animationFrameId);

    // Hide modal and restart the game after 5.5 seconds
    setTimeout(() => {
        modalContainer.classList.remove('show-modal');
        isGameWon = false; // Reset win state
        init();  // Restart the game
        animate();  // Restart animation loop
    }, 5500);
};
const loose = () => {

    playSound(die);
    const win = document.querySelector('.modal__title');
    const winImg = document.querySelector('.modal__img');
    winImg.src="https://s3.getstickerpack.com/storage/uploads/sticker-pack/susu/sticker_7.gif?16c8f70a2dbb7ebd47294dd40ad22fb1"
    win.innerHTML="You lost :(";
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('show-modal');

    clearInterval(warningIntervalId);
    cancelAnimationFrame(animationFrameId);
    
    // Hide modal and restart the game after 5.5 seconds
    setTimeout(() => {
        modalContainer.classList.remove('show-modal');
        isGameWon = false; // Reset win state
        init();  // Restart the game
        animate();  // Restart animation loop
    }, 5500);
};



// Left Button
leftBtn.addEventListener('touchstart', () => {
    console.log('left');
    Keys.left.pressed = true;
    lastKey = 'left';
});
leftBtn.addEventListener('touchend', () => Keys.left.pressed = false);

// Down Button
downBtn.addEventListener('touchstart', () => {
    console.log('down');
    playSound(jump);
});

// Right Button
rightBtn.addEventListener('touchstart', () => {
    console.log('Right');
    Keys.right.pressed = true;
    lastKey = 'right';
});
rightBtn.addEventListener('touchend', () => Keys.right.pressed = false);

// Up Button
upBtn.addEventListener('touchstart', () => {
    console.log('up' + player.velocity.y);
    if (player.canJump) {
        player.velocity.y -= 30; // Set jump strength here
        playSound(longJumpSound);
        player.canJump = false; // Prevent further jumps until grounded
    }
});
upBtn.addEventListener('touchend', () => player.canJump = true);



// zoom off in mobile

document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Prevent zooming when double-tapping
document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;

document.addEventListener('touchend', function (e) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);







 

