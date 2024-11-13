import { useState } from "react"

export default function App() { 
    // 游戏参数.
    const args = {
        layoutRow: 3,
        layoutCol: 3
    }
    return (
        <div>
            <Layout {...args} />
        </div>
    )
}


// 棋盘布局
// col: 列数
// row: 行数
function Layout({ layoutCol, layoutRow }) {
    // 创建 col * row 二维数组.
    const board = Array(layoutRow).fill(null).map(() => Array(layoutCol).fill(null))
    const [squares, setSquares] = useState(Array(layoutRow).fill(null).map(() => Array(layoutCol).fill(null)))
    // const handleClick = (row, col) => {
    //     const temp = squares.slice()
    //     temp[row][col] = 'X'
    //     setSquares(temp)
    // }

    // 点击方块事件函数
    const handleClick = (row, col) => {
        setSquares(prevSquares => {
            const newSquares = prevSquares.map((r, rowIndex) => 
                rowIndex === row ? r.map((cell, colIndex) => colIndex === col ? 'X' : cell) : r
            )
            return newSquares
        })
    }

    return (
        <>
            {board.map((row, rowIdx) => (
                <div key={rowIdx} className="board-row">
                    {row.map((_, colIdx) => (
                        <Square key={`${rowIdx}-${colIdx}`} value={squares[rowIdx][colIdx]} onSquareClick={ ()=> handleClick(rowIdx, colIdx) }/>
                    )) }
                </div>
            )) }
        </>
    )
}

// 方块
function Square({ value, onSquareClick }) {
    return <button className="square" onClick={ onSquareClick } > { value } </button>

}