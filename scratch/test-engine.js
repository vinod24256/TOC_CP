const fs = require('fs');

// Simple mock for window
global.window = {};

// Load the file
const script = fs.readFileSync('assets/tm-engine.js', 'utf8');
(new Function('window', script))(global.window);

const { createCaesarTM } = global.window.TMEngine;

const tm = createCaesarTM(3);
tm.loadInput("hello");
tm.run();

const result = tm.out();
console.log(`Test Input: "hello"`);
console.log(`Expected Output: "khoor"`);
console.log(`Actual Output: "${result}"`);

if (result === "khoor") {
    console.log("TEST PASSED ✓");
} else {
    console.log("TEST FAILED ✗");
    process.exit(1);
}
