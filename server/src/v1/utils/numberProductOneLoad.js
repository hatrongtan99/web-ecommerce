const numberProductOneLoad = 8

const loadExtraProduct = (currentPage = 1) => {
    return currentPage * numberProductOneLoad
}

const emptyOrRows = (rows) => {
    if (!rows) return []
    return rows;
}

const datetimeSQL = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
    
};

module.exports = { loadExtraProduct, emptyOrRows, numberProductOneLoad, datetimeSQL }