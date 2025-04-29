const gameArea = document.getElementById('game-area');
const phoneDisplay = document.getElementById('phone-number');
const controlPanel = document.getElementById('controls');
let phoneNumber = ['_','_','_','_','_','_','_','_','_','_'];
let phoneNumberIndex = 0;
let power = 0;
let numberTargets = [];
const restartButton = document.getElementById('restart-button');
let calling = false;

restartButton.addEventListener('click', reset);

function updatePhoneDisplay() {
    phoneDisplay.innerText = phoneNumber.join(' ');
    if (phoneNumberIndex === 10) {
        calling = true;
        controlPanel.style.display = 'none';
        phoneDisplay.innerText = 'CALLING...';
        setTimeout(() => {
            phoneDisplay.innerText = 'CALL ENDED';
            setTimeout(() => {
                reset(); 
            }, 2000);
        }, 4000);
    }
}

function reset() {
    phoneNumber = ['_','_','_','_','_','_','_','_','_','_'];
    phoneNumberIndex = 0;
    
    calling = false;
    controlPanel.style.display = 'block';
    
    updatePhoneDisplay();
    
    cannonball.reset();
    tank.reset();
}

updatePhoneDisplay();

function addDigit(digit) {
    if (phoneNumberIndex < 10 && !calling) {
        phoneNumber[phoneNumberIndex] = digit;
        phoneNumberIndex++;
        updatePhoneDisplay();
    }
}


class Number {
    constructor(value) {
        this.value = value;
        this.element = document.createElement('div');
        this.element.className = 'number';
        this.element.innerText = value;
        gameArea.appendChild(this.element);
    }

    setPosition(x, y) {
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
    }
}

for (let i = 0; i <= 9; i++) {
    const target = new Number(i);
    target.setPosition(50 + i * 50, 50);
    numberTargets.push(target);
}

class CannonBall {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'cannonball';
        gameArea.appendChild(this.element);

        this.animationInterval = null;
        this.isActive = false;
        this.x = 0;
        this.y = 0;
        this.velocity = { x: 0, y: 0 };
        
        console.log("Cannonball created:", this.element);
    }

    reset() {
        console.log("cannonball reset")
        this.x=0;
        this.y=0;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.velocity = { x: 0, y: 0 };
        this.isActive = false;
        this.element.style.display = 'none';
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    fire(startX, startY, angle, velocity) {
        console.log("Cannonball firing from:", startX, startY);
        this.reset(); 
        
        this.x = startX;
        this.y = startY;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.display = 'block';

        const dx = velocity * Math.cos(angle);
        const dy = velocity * Math.sin(angle);

        this.isActive = true;
        let t = 0;
        const gravity = 0.6;

        this.animationInterval = setInterval(() => {
            if (!this.isActive) return;
            
            t += 0.2;
            this.x = startX + dx * t;
            this.y = startY - (dy * t - 0.5 * gravity * t * t);
            
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            
            if (checkCollision(this)) {
                this.reset();
                return;
            }
            
            if (this.x < 0 || this.x > gameArea.clientWidth || this.y > gameArea.clientHeight) {
                this.reset();
            }
        }, 20);
    }
}
const cannonball = new CannonBall();

function checkCollision(cannonball) {
    const gameAreaBounds = gameArea.getBoundingClientRect();
    const cannonBallBounds = cannonball.element.getBoundingClientRect();

    const leftCannonballBounds = cannonBallBounds.left - gameAreaBounds.left;
    const rightCannonballBounds = cannonBallBounds.right - gameAreaBounds.left;
    const topCannonballBounds = cannonBallBounds.top - gameAreaBounds.top;
    const bottomCannonballBounds = cannonBallBounds.bottom - gameAreaBounds.top;
    
    
    for (let target of numberTargets) {
        const targetBounds = target.element.getBoundingClientRect();

        const leftTargetBounds = targetBounds.left - gameAreaBounds.left;
        const rightTargetBounds = targetBounds.right - gameAreaBounds.left;
        const topTargetBounds = targetBounds.top - gameAreaBounds.top;
        const bottomTargetBounds = targetBounds.bottom - gameAreaBounds.top;
        
        
        if (leftCannonballBounds < rightTargetBounds && 
            rightCannonballBounds > leftTargetBounds && 
            topCannonballBounds < bottomTargetBounds && 
            bottomCannonballBounds > topTargetBounds) {
            
                
            addDigit(target.value);
            // cannonball.reset();
            return true;
        }
    }
    
    return false;
}

// tank class
class Tank {
    constructor() {
        this.turretElement = document.getElementById('turret');
        this.angleSlider = document.getElementById('angle-slider');
        this.angleValue = document.getElementById('angle-value');
        this.fireButton = document.getElementById('fire-button');
        this.powerBar = document.getElementById('power-bar');
        
        this.angle = 45;
        this.power = 0;
        this.powerInterval = null;

        this.startX = 60;
        this.startY = 315;
        
        this.angleSlider.addEventListener('input', () => this.updateAngle());
        this.fireButton.addEventListener('mousedown', () => this.startCharging());
        this.fireButton.addEventListener('mouseup', () => this.fire());
    }
    
    reset() {
        this.angle = 45;
        this.power = 0;
        if (this.powerInterval) clearInterval(this.powerInterval);
        this.angleSlider.value = 45;
        this.updateAngle();
        this.powerBar.style.width = '0%';
    }
    
    updateAngle() {
        this.angle = parseInt(this.angleSlider.value);
        this.angleValue.textContent = `${this.angle}°`;
        this.turretElement.style.transform = `rotate(-${this.angle}deg)`;
    }
    
    startCharging() {
        this.power = 0;
        this.powerBar.style.width = '0%';
        
        this.powerInterval = setInterval(() => {
            this.power += 2;
            if (this.power > 100) this.power = 100;
            this.powerBar.style.width = `${this.power}%`;
        }, 50);
    }
    
    fire() {
        clearInterval(this.powerInterval);
        
        const angle = this.angle * Math.PI / 180;
        const velocity = this.power * 0.6;
        cannonball.fire(this.startX, this.startY, angle, velocity);
    }
}
const tank = new Tank();
tank.updateAngle(); 
