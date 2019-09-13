const diagonal = (role, columns) => {
    const equalIndex = (col, colIndex) => columns[colIndex][colIndex] === role;
    return columns.every(equalIndex);
}
const invertedDiagonal = (role, columns) => {
    const invertedIndex = (_, colIndex) => columns[colIndex][columns.length - 1 - colIndex] === role;
    return columns.every(invertedIndex);
};
const horizontalLine = (role, columns) => {
    let memo = [];
    const toRoleIndex = (s, i) => s === role ? i : null;
    const onlyIndices = (i) => i !== null;
    const onlyInMemo= (i) => memo.length === 0 ? true : memo.indexOf(i) > -1;
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        const updatedMemo = columns[colIndex]
            .map(toRoleIndex)
            .filter(onlyIndices);
        if (updatedMemo.length === 0) return false;
        else {
            memo = updatedMemo.filter(onlyInMemo);
            if (memo.length === 0) return false;
        }
    }
    return true;
}
const verticalLine = (role, columns) => {
    const isColumnFull = (col) => col.every(slot => slot === role);
    return columns.some(isColumnFull);
}

const winnerTests = [
    diagonal,
    invertedDiagonal,
    horizontalLine,
    verticalLine
]

export default winnerTests;