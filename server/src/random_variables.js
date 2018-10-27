'use strict';

const BOUND_PROBABILITY = 0.5;
const MAX_NUMBER_OF_VARIABLES = 5;

const MIN_EPOCH = 0;
const MAX_EPOCH_INTERVAL = 315400000;

const MIN_NUMBER = - 300;
const MAX_NUMBER_INTERVAL = 600;

const randomVariables = [
    {
        "name" : "awesome_text",
        "label" : "Who's awesome?",
        "type" : "text"
    },
    {
        "name" : "bad_text",
        "label" : "Who's a bad boy?",
        "type": "text"
    },
    {
        "name": "flavour",
        "label": "What's your favorite ice cream flavor?",
        "type": "text"
    },
    {
        "name": "worst_movie",
        "label": "What's the first movie you've ever seen?",
        "type": "text"
    },
    {
        "name" : "meaning_of_life",
        "label" : "What's the meaning of life, the universe, and everything?",
        "type" : "number"
    },
    {
        "name": "punchline",
        "label": "What's the punchline of this joke? A math professor, John, is having problems with his sink so he calls a plumber. The plumber comes over and quickly fixes the sink. The professor is happy until he gets the bill. He tells the plumber, \"How can you charge this much? This is half of my paycheck.\" But he pays it anyways.The plumber tells him, \"Hey, we are looking for more plumbers. You could become a plumber and triple your salary. Just make sure you say you only made it to 6th grade, they don't like educated people.\"The professor takes him up on the offer and becomes a plumber. His salary triples and he doesn't have to work nearly as hard. But the company makes an announcement that all of their plumbers must get a 7th grade education. So they all go to night school.On the first day of night school they all attend math class. The teacher wants to gauge the class so he asks John, \"What is the formula for the area of a circle?\"John walks up to the board and is about to write the formula when he realizes he has forgotten it. So he begins to attempt to derive the formula, filling the board with complicated mathematics. He ends up figuring out it is negative pi times radius squared. He thinks the minus doesn't belong so he starts over, but again he comes up with the same equation. After staring at the board for a minute he looks out at the other plumbers and sees that they are all whispering: ...",
        "type": "text"
    },
    {
        "name": "day",
        "label" : "What was the date on 1965/03/04 ?",
        "type" : "date"
    }
];

exports.getRandomTemplate = function() {
    var template = {
      "template_id": getRandomInt(0,1000),
      "template_name": "Template" + getRandomInt(0,1000),
      "variables": []
    };
    for (var i =0;i < getRandomInt(0,MAX_NUMBER_OF_VARIABLES); i++) {
        template.variables.push(getRandomVariable());
    }
    return template;
};

/**
 *  get a random variable from the array and give it random bounds if date of number
 */
function getRandomVariable() {
    var variable = randomVariables[Math.floor(Math.random()*randomVariables.length)];
    if (variable.type == "number") {
        if(shouldBound()) variable.min_value = getRandomInt(MIN_NUMBER, MIN_NUMBER + MAX_NUMBER_INTERVAL);
        if(shouldBound()) variable.max_value = variable.min_value + getRandomInt(0, MAX_NUMBER_INTERVAL);
    } else if (variable.type == "date") {
        if(shouldBound()) variable.min_value = getRandomInt(MIN_EPOCH, MIN_EPOCH + MAX_EPOCH_INTERVAL);
        if(shouldBound()) variable.max_value = variable.min_value + getRandomInt(0, MAX_EPOCH_INTERVAL);
    }
    return variable;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * return true if we should give a bound according the BOUND_PROBABILITY constant
 */
function shouldBound() {
    return Math.random() <= BOUND_PROBABILITY;
}