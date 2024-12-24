/**
 * @author      Alex Etienne
 * @version     1.0
 * @since       2024-12-24
 */

"use strict";

// Constants
const ZOOM = 200;

const COLORS = [
    [110, 235, 131], // Green
    [228, 255, 26], // Yellow
    [27, 231, 255] // Blue
];

const STAGES = [
    0, // Green
    0.06 // Yellow
];

// Get canvas and its context
const canvas = document.querySelector("canvas");

canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext("2d");

// Global variables
let imageData = new ImageData(canvas.width, canvas.height);

let time = 0;

/**
 * Set the color of one pixel of the imageData
 * @param index Index of the pixel.
 * @param r Red of the color.
 * @param g Green of the color.
 * @param b Blue of the color.
 */
function setPixelColor(index, r, g, b) {
    imageData.data[index] = r; // R value
    imageData.data[index + 1] = g; // G value
    imageData.data[index + 2] = b; // B value
    imageData.data[index + 3] = 255; // A value
}

// Configure perlin
let seed = Math.random();
noise.seed(seed);
console.log(seed);

// Generate the image
for (let i = 0; i < imageData.data.length; i += 4) {
    // Get the grayscale color of the pixel
    let greyColor = noise.perlin2(i / 4 % canvas.width / ZOOM,
        i / 4 / canvas.width / ZOOM);

    // Determine the color of the pixel
    let color;
    if (greyColor < STAGES[0]) {
        color = COLORS[0]; // Green
    } else if (greyColor < STAGES[1]) {
        color = COLORS[1]; // Yellow
    } else {
        color = COLORS[2]; // Blue
    }

    // Set the pixel color in the imageData
    let variation = noise.perlin2(i / 4 % canvas.width / ZOOM,
        i / 4 / canvas.width / ZOOM) * 50;

    setPixelColor(i, color[0] + variation, color[1] + variation, color[2] + variation);
}

ctx.putImageData(imageData, 0, 0);
