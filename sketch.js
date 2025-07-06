let isDay = true; // Start in daytie
let flowers = []; // Array to store flower positions
let bees = []; // Array to hold multiple bee positions
let flicker = 200; // Starting brightness for nighttime fireflies

function setup() {
  createCanvas(600, 400); // Set the canvas size
  background(135, 206, 235); // Light blue sky background
  noStroke(); // No outlines on shapes

  // Create multiple bees with random positions
  for (let i = 0; i < 4; i++) {
    bees.push({
      x: random(-100, width),   // Start randomly across the screen
      y: random(100, 250)       // Beee flying height raneg
    });
  }
}

function draw() {
  // Day Mode
  if (isDay) {
    // Draw the sun in the top-left corner
    background(135, 206, 235); // Daytine sky (light blue)
    fill(255, 204, 0);         // Yello sun
    ellipse(80, 80, 100, 100); // Sun centered at (80, 80)
  } else {
    // Niget Mode
    background(20, 24, 82);    // Night sky
    fill(255, 255, 224);       // Pasty Moon color
    ellipse(80, 80, 80, 80);   // Moon
    
    // Fluttering Firflies
    flicker = random(100, 255); // Update flicker alpha for fireflies
  }

  // Grounf pieces (same for day and night)
  fill(34, 139, 34);          // Grass
  rect(0, 300, width, 100);   // Grass across the bottom

  // Draw the soil under the grass
  fill(139, 69, 19);          // Soil brownish-orange
  rect(0, 370, width, 30);    // Thin strip of soil at very bottom

  // Plant inital row of flowers using loop
  for (let x = 50; x <= width - 50; x += 60) {
    drawFlower(x, 320); // Draw flowers slightly above the soil
  }

  // Draw all user-planted flowers from array
  for (let i = 0; i < flowers.length; i++) {
    drawFlower(flowers[i].x, flowers[i].y);
  }

  // Bees flying around
  for (let i = 0; i < bees.length; i++) {
    let bee = bees[i];
    drawBee(bee.x, bee.y); // Use helper function

    bee.x += 0.3; // Move to the right
    if (bee.x > width + 20) {
      bee.x = -20; // Loop to the left again
    }
  }
}

// Function to draw a flower
function drawFlower(x, y) {
  // Draw petals
  fill(255, 105, 180); // Hot pink petals
  ellipse(x - 10, y - 10, 20, 20); // Top-left petal
  ellipse(x + 10, y - 10, 20, 20); // Top-right petal
  ellipse(x - 10, y + 10, 20, 20); // Bottom-left petal
  ellipse(x + 10, y + 10, 20, 20); // Bottom-right petal

  // Draw center of flower
  fill(255, 215, 0); // Golden yellow center
  ellipse(x, y, 15, 15); // Center of flower

  // Draw stem
  stroke(0, 100, 0); // Dark green stem
  strokeWeight(2);
  line(x, y + 10, x, y + 30); // Stem goes downward
  noStroke(); // Turn off stroke again after drawing stem
}

// Function to draw a bee or firefly
function drawBee(x, y) {
  // Bee Body
  if (isDay) {
    fill(255, 204, 0); // Yellow bee body for daytime
  } else {
    fill(173, 255, 47, flicker); // Lime green firefly glow for night
  }
  ellipse(x, y, 20, 15); // Bee body

  // Bees wings
  fill(0); // Black stripes
  rect(x - 5, y - 3, 3, 6);
  rect(x, y - 3, 3, 6);

  fill(255); // White wings
  ellipse(x - 7, y - 7, 10, 10); // Left wing
  ellipse(x + 7, y - 7, 10, 10); // Right wing
}

// This function runs every time the user clicks
function mousePressed() {
  // Check if user clicked inside the sun/moon circle
  let d = dist(mouseX, mouseY, 80, 80); // Distance from mouse to center of sun/moon
  if (d < 50) {
    isDay = !isDay; // Toggle day/night only when clicking the sun or moon
  }

  // Only plant if the user clicks in the grass area
  if (mouseY >= 300 && mouseY <= 370) {
    flowers.push({ x: mouseX, y: mouseY }); // Save position to array
  }
}