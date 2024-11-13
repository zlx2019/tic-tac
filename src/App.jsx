import { useEffect, useState } from "react";

export default function App() {
  const args = {
    rows: 3,    // 棋盘行数
    columns: 3, // 棋盘列数
  };
  return (
    <div>
      <Layout {...args} />
    </div>
  );
}

// 棋盘布局
function Layout({ rows, columns }) {
  // 创建二维数组棋盘 共 (rows * columns) 个方格
  // X    X    X
  // X    X    X
  // X    X    X
  const board = Array(rows).fill(null).map(() => Array(columns).fill(null));

  // 创建 (rows * columns) 个状态，表示每个方格的状态.
  // 状态有三种: null/X/O, 默认为 null
  const [squaresStatus, setSquaresStatus] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null))
  );

  // 状态监听器, 当 squares 发生变化时回调
  useEffect(() => {
    console.log(`战况发生变化: `, squaresStatus);
  }, [squaresStatus]);

  /**
   * 棋盘点击事件
   * @param r & c: 被点击的方块位置
   */
  const handleClick = (r, c) => {
    // 遍历棋盘状态二维数组，找到点击的方块并修改值
    setSquaresStatus((prevStatus) => {
      const newStatus = prevStatus.map((row, rowIdx) => {
        return rowIdx === r
          ? row.map((column, colIndex) => (colIndex === c ? "X" : column))
          : row;
      });
      return newStatus;
    });
  };

  return (
    <>
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

// 棋局单个方块
function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}> {value} </button>
}
