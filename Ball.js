const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000005;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }


    // this line of code gets the computed styles of the ballElem element, extracts the value of the custom CSS property --x, and converts it to a floating-point number.
    // Setting x position
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }

    // Setting y position
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    rect() {
        // getBoundingClientRect() is a built-in method provided by the DOM (Document Object Model) API in web browsers. It's used to retrieve a DOMRect object that represents the current position and dimensions of an HTML element relative to the viewport. This method is commonly used for various tasks, such as collision detection, element positioning, and responsive design.
        return this.ballElem.getBoundingClientRect();
    }

    // Creating Reset function
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        
        // The following while loop ensures that the initial direction of the ball is not too steep
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            // Reverse the vertical direction of the ball
            this.direction.y *= -1;
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            // Reverse the horizontal direction of the ball
            this.direction.x *= -1;
        }
    }
}

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Will check for collisions
function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top
    )
}