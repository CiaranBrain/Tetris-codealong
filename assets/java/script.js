// wrap this around code if js link at top of the page?
// document.addEventListener('DOMContentLoaded', () =>{

// })

const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('#start-button')
const width = 10

//The Tetrominoes

const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 2, width * 2, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
]

const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width.width + 1, width * 2 + 1]
]

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width + 3 + 1],
    [width, width + 1, width + 2, width + 3]
]

const theTestrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0


//randomly select a Teromonio and its first rotaion
let random = Math.floor(Math.random() * theTestrominoes.length)
let current = theTestrominoes[random][currentRotation]

//draw the tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

// undraw the Tetromino

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
    })
}

// make the tetromino move down every second

timerId = setInterval(moveDown, 1000)

//move down function 
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

//freeze function

function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start new tetromino falling
        random = Math.floor(Math.random() * theTestrominoes.length)
        current = theTestrominoes[random][currentRotation]
        currentPosition = 4
        draw()
    }
}

// move the tetromino left, unless is at the endge or there is a blockage 
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }
}
draw()
