// script.js
const particleCount = 100;
const particles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0);

    // Sort particles by distance from the bottom of the screen
    particles.sort((a, b) => a.y - b.y);

    for (const particle of particles) {
        particle.update();
        particle.draw();
    }
}

class Particle {
    constructor() {
        this.x = random(width); // Random initial position
        this.y = random(height);
        this.size = random(2, 6); // Random size for most particles
        this.opacity = random(50, 200);
        this.vx = random(-0.5, 0.5); // Random velocity
        this.vy = random(-1, -0.5);
        if (random() < 0.1) {
            // 10% of particles have larger size
            this.size *= 2;
            this.opacity *= 0.7; // Reduce opacity for larger particles
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y <= 0) {
            // Reset particles that move off the top of the canvas
            this.x = random(width);
            this.y = height;
            this.vx = random(-0.5, 0.5);
            this.vy = random(-1, -0.5);
        }
    }

    draw() {
        // Calculate the gradient color based on particle's y position
        const gradientColor = lerpColor(color('teal'), color('purple'), this.y / height);

        // Render particles on the gradient background
        noStroke();
        fill(gradientColor, this.opacity);
        ellipse(this.x, this.y, this.size * 1.5); // Enlarge the particles in the foreground
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}