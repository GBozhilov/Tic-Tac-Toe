import React, {Component} from 'react';

import Board from './components/Board';


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    static calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    handleClick(i) {
        const {stepNumber} = this.state;
        const history = this.state.history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = Game.calculateWinner(squares);

        if (winner || squares[i]) {
            return;
        }

        const {xIsNext} = this.state;
        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(stepNumber) {
        const xIsNext = (stepNumber % 2) === 0;

        this.setState({
            stepNumber,
            xIsNext,
        });
    }

    render() {
        const {history, stepNumber} = this.state;
        const current = history[stepNumber];
        const winner = Game.calculateWinner(current.squares);
        let status;

        const moves = history.map((step, move) => {
            const desc = move
                ? 'Go To Move #' + move
                : 'Go To Game Start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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