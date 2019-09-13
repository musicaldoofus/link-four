const getUpdatedColumnList = ({currentUser, columns}, colIndex) => {
    let openSlot = columns.length - 1;
    for (let slotIndex = 0; slotIndex <= openSlot; slotIndex++) {
        if (columns[colIndex][slotIndex] !== undefined) {
            openSlot = slotIndex - 1;
            break;
        }
    }
    const updatedColumnList = columns.slice();
    const updatedColumn = updatedColumnList[colIndex];
    updatedColumn[openSlot] = currentUser;
    updatedColumnList[colIndex] = updatedColumn;
    return updatedColumnList;
}

export default getUpdatedColumnList;