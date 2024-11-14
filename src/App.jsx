import { useEffect, useState } from 'react';

export default function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const args = {
        rows: 3,
        columns: 3,
    };
    return (
        <>
            <div>
                <Layout {...args} />
            </div>
            <div className="game-info">
            </div>
        </>
    );
}

// 棋盘布局
function Layout({ rows, columns }) {
    // 创建 (rows * columns) 个状态，表示每个方格的状态.
    // 状态有三种: null/X/O, 默认为 null
    const [squaresStatus, setSquaresStatus] = useState(
        Array(rows)
            .fill(null)
            .map(() => Array(columns).fill(null))
    );
    // 当前攻击者是否为X
    const [attackerX, setAttackerX] = useState(true);

    // 创建二维数组棋盘 共 (rows * columns) 个方格
    const board = Array(rows)
        .fill(null)
        .map(() => Array(columns).fill(null));

    // 状态监听器, 当 squares 发生变化时回调
    useEffect(() => {
        console.log('战局发生了变化', squaresStatus);
    }, [squaresStatus]);

    /**
     * 棋盘点击事件
     * @param r & c: 被点击的方块位置
     */
    const handleClick = (r, c) => {
        if (squaresStatus[r][c]) {
            return;
        }
        setSquaresStatus((prevStatus) => {
            const newStatus = prevStatus.slice();
            newStatus[r][c] = attackerX ? 'X' : 'O';
            setSquaresStatus(newStatus);
            setAttackerX(!attackerX);
            return newStatus;
        });
    };

    // 是否有人获胜
    let winner = calculateWinner(squaresStatus);
    let message;
    if (winner) {
        message = `${winner} is winning.`;
    } else {
        message = `Next player: ${attackerX ? 'X' : 'O'}`;
    }
    return (
        <>
            <div className="status">{message}</div>
            {board.map((row, rowIdx) => (
                <div key={rowIdx} className="board-row">
                    {row.map((_, colIdx) => (
                        <Square
                            key={`${rowIdx}-${colIdx}`}
                            value={squaresStatus[rowIdx][colIdx]}
                            onSquareClick={() => handleClick(rowIdx, colIdx)}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

// 计算是否有人胜利
function calculateWinner(squares) {
    for (let row = 0; row < 3; row++) {
        if (
            squares[row][0] &&
            squares[row][0] === squares[row][1] &&
            squares[row][1] === squares[row][2]
        ) {
            return squares[row][0];
        }
    }
    for (let col = 0; col < 3; col++) {
        if (
            squares[0][col] &&
            squares[0][col] === squares[1][col] &&
            squares[1][col] === squares[2][col]
        ) {
            return squares[0][col];
        }
    }
    if (
        squares[0][0] &&
        squares[0][0] === squares[1][1] &&
        squares[1][1] === squares[2][2]
    ) {
        return squares[0][0];
    }
    if (
        squares[0][2] &&
        squares[0][2] === squares[1][1] &&
        squares[1][1] === squares[2][0]
    ) {
        return squares[0][2];
    }
    return null;
}

// 棋局方格
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
