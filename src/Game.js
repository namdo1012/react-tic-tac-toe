import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}

	jumpTo(step){
		this.setState({
			stepNumber: step,
			xIsNext: (step%2) === 0,
		});
	}

	handleClick(i) {
  		const history = this.state.history.slice(0, this.state.stepNumber + 1);
  		const current = history[history.length - 1];
  		const currSquares = current.squares.slice();

		if (calculateWinner(currSquares) || currSquares[i]){
			return;
		}

  		currSquares[i] = this.state.xIsNext ? 'X' : 'O';
  		this.setState({
  			history: history.concat([{
  				squares: currSquares,
  			}]),
  			stepNumber: history.length,
  			xIsNext: !this.state.xIsNext,
  		});
	}

  	render (){
  		const history = this.state.history;
  		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		let status;
    	if (winner) {
      		status = 'Winner: ' + winner;
    	} else {
      		status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    	}

    	const moves = history.map((step, move) => {
    		const desc = move === 0 ?
    				`Go to game start` :
    				`Go to move #${move}`;
    		return (
    			<li key={move}>
    				<button onClick={() => this.jumpTo(move)}>{desc}</button>
    			</li>
    		);
    	})

    	return (
	      	<div className="game">
	        	<div className="game-board">
	          		<Board 
	          			squares={current.squares}
	          			onClick={(i) => this.handleClick(i)}
	          		/>
	        	</div>
		      	<div className="game-info">
		      		<div>{status}</div>
		      		<ol>{moves}</ol>
		      	</div>
	      	</div>

	    );   
	}
}

export default Game;
