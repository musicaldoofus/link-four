const getOpenColumns = (columns) => {
    return columns
        .map((column, colIndex) => column.some(slot => slot === undefined) ? colIndex : null)
        .filter(c => c !== null);
}

export default getOpenColumns;