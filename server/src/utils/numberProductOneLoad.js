const numberProductOneLoad = 8

const loadExtraProduct = (currentPage = 1) => {
    return (currentPage - 1) * numberProductOneLoad
}

const emptyOrRows = (rows) => {
    if (!rows) return []
    return rows;
}

module.exports = { loadExtraProduct, emptyOrRows, numberProductOneLoad }