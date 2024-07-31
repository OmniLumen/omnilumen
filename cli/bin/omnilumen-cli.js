import cfonts from 'cfonts';
import ClientMenu from "../src/libs/clientMenu.js";


cfonts.say('OmniLumen|cli', {
    font: 'simple',              // define the font face
    align: 'left',              // define text alignment
    colors: ['system'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many characters can be on one line
    gradient: ['red', 'blue'],           // define your two gradient colors
    //gradient: false,           // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    rawMode: false,             // define if the line breaks should be CRLF (`\r\n`) over the default LF (`\n`)
    env: 'node'                 // define the environment cfonts is being executed in
});

const clientMenu = new ClientMenu();
clientMenu.showMenu();