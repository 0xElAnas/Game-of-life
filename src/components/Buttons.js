import React from 'react';
import { ButtonToolbar} from 'react-bootstrap';

class Buttons extends React.Component {

	/**
	 * Change the speed
	 */
	handleClick = (e) => {
		this.props.changeSpeed(e.target.value);
	}

	/**
	 * Change the grid size 
	 */
	changeGrid = (e) => {
		this.props.gridSize(e.target.id)
	}

	render() {
		return (
			<div className="center">
				<ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Seed
					</button>

					<br /><br />
					<span>Change the grid size: </span>
					<input type="button" id="1" value="20x10" onClick={this.changeGrid} />
					<input type="button" id="2" value="40x20" onClick={this.changeGrid} />
					
					<br /><br />
					<span>Change the speed (100 to 1000 ms): </span>
					<input type="range" list="tickmarks" min="100" max="1000" step="100" onInput={this.handleClick} onChange={this.handleClick} />

					{/* This is only supported by Chrome 
					 /* it is used to define a series of hash marks on the control (range input)
					*/}
					<datalist id="tickmarks">
						<option value="100" />
						<option value="200" />
						<option value="300" />
						<option value="400" />
						<option value="500" />
						<option value="600" />
						<option value="700" />
						<option value="800" />
						<option value="900" />
						<option value="1000" />
					</datalist>
					
				</ButtonToolbar>

			</div>
			)
	}
}

export default Buttons;