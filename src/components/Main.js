import React from 'react';
import Buttons from './Buttons';
import Grid from './Grid';

/**
 * 
 * @param {Array} arr 	Original array
 * @return {Array}  	The new array.
 */
function arrayClone(arr) {
	return arr.slice();
}


/**
 * Add two rows and two columns to the original array with values false.
 * 
 * example: X represent the original values 
 * 
 * 		false	false	false	false	false
 * 		false	X		X		X		false
 * 		false	X		X		X		false
 * 		false	X		X		X		false
 * 		false	false	false	false	false
 * 
 * @param {Array} myArray	Original array 
 * @param {Integer} rows 	Number of rows
 * @param {Integer} cols 	Number of columns
 * 
 * @return {Array} a		the new array with borders set to 'false'.
 */
function arrayBorders(myArray, rows, cols) {
	// default array values
	Array.prototype.repeat = function(what, L){
		while(L) this[--L]= what;
		return this;
	}

	var a = new Array(rows + 2);

	// create a multidimensional array with 0 as default value
	for (let i = 0; i < rows + 2; i++) {
		// add 0 as the default value
		a[i] = [].repeat(false, cols + 2);
	}
	
	for (let i = 1; i < a.length - 1; i++) {
		for (let j = 1; j < a[0].length - 1; j++) {
			a[i][j] = myArray[i-1][j-1]
		}
	}

	return a
}


class Main extends React.Component {
	constructor() {
		super();
		this.speed = 1000;
		this.rows = 10;
		this.cols = 20;

		this.state = {
			generation: 0,
			gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
		}
	}
	
	/**
	 * Change the state of the selected cell
	 */
	selectBox = (row, col) => {
		let gridCopy = arrayClone(this.state.gridFull);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
	}
	
	/**
	 * Fill the grid randomly with live cells
	 */
	seed = () => {
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
	}

	/**
	 * Call the play function every (this.speed)
	 */
	playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

	/**
	 * Pause the game
	 */
	pauseButton = () => {
		clearInterval(this.intervalId);
	}

	/**
	 * Change the variable 'speed'
	 */
	changeSpeed = (val) => {
		this.speed = val;
		this.playButton();
	}

	/**
	 * Clear the grid
	 */
	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
	}
	
	/**
	 * Change the grid size
	 */
	gridSize = (size) => {
		switch (size) {
			case "1":
				this.cols = 20;
				this.rows = 10;
			break;
			default:
				this.cols = 40;
				this.rows = 20;
		}
		this.clear();

	}

	play = () => {
		// prevent mutating the original array
		let g2 = arrayClone(this.state.gridFull);
		let g = this.state.gridFull;
		g = arrayBorders(g, this.rows, this.cols);
		
		// Loop through all the cells
		for (let i = 1; i < this.rows + 1; i++) { 
            for (let j = 1; j < this.cols + 1; j++) {
				// Count will hold the numbers of live cells
				let count = 0;

				// Loop through the 8 neghbours of the current cell
                for (let k = i - 1; k < i + 2; k++) {
                    for (let c = j - 1; c < j + 2; c++) {

						// Should not count the current cell
						let bool = true;
						if(i === k && j === c) bool = false;
                        if(g[k][c] && bool) count++;
                    }
				}

				// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
				// Any live cell with two or three live neighbours lives on to the next generation.
				// Any live cell with more than three live neighbours dies, as if by overpopulation.
				// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if(g[i][j] && (count < 2 || count > 3)) { g2[i-1][j-1] = false; }
		        else if(!g[i][j] && count === 3) { g2[i-1][j-1] = true; }
            }
        }
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});
	}

	/**
	 * Change the beginning state of the game when the 
	 * Main component is mounted 
	 */
	// componentDidMount() {
	// 	this.seed();
	// 	this.playButton();
	// }

	render() {
		return (
			<div>
				<h1>The Game of Life</h1>
				<Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					changeSpeed={this.changeSpeed}
					clear={this.clear}
					seed={this.seed}
					gridSize={this.gridSize}
				/>
				<center><p><i>Speed: {this.speed} ms</i></p></center>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
				<h2>Generations: {this.state.generation}</h2>
			</div>
		);
	}
}

export default Main;