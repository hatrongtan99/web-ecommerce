const generateFilterQuery = (query) => {

    const key = Object.keys(query);
    const values = Object.values(query);
    if (key.length == 0) return '';
    let condition = '';
    let and = 'AND';

    for (let i = 0; i < key.length; i++) {
        const arrValue = values[i].split(' ,')
        for (let j = 0; j < arrValue.length; j++) {
            if (key[i] == 'brand_name') {
                condition += ` ${and} ${key[i]} = '${arrValue[j]}'`
            } else if (key[i] == 'product_price') {
                if (arrValue[j] == '0-1000') {
                    condition += ` ${and} ${key[i]} < 1000000`
                } else if (arrValue[j] == '1000-3000') {
                    condition += ` ${and} ${key[i]} BETWEEN 1000000 AND 3000000`
                }
            }
        }
    }

    return condition
}

module.exports = generateFilterQuery