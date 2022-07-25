const generateFilterQuery = (query) => {

    const key = Object.keys(query);
    const values = Object.values(query);
    if (key.length == 0) return '';
    let condition = '';
    const and = 'AND';
    const or = 'OR';

    for (let i = 0; i < key.length; i++) {
        const arrValue = values[i].split(',')
        for (let j = 0; j < arrValue.length; j++) {
            if (key[i] == 'brand_ID') {
                condition += ` ${and} b.${key[i]} IN (${[...arrValue]})`
                break;
            } else if (key[i] == 'product_price') {
                if (j == 0) {
                    condition += ` ${and}`
                } else {
                    condition += ` ${or}`
                }
                
                switch(arrValue[j]) {

                    case  '0-1000000': 
                    case '1000000-2000000': 
                    case'2000000-3000000': 
                    case '3000000-5000000': {
                        condition += ` p.${key[i]} BETWEEN ${arrValue[j].split('-')[0]} AND ${arrValue[j].split('-')[1]}`
                        break
                    }

                    case '5000000-0' : {
                        condition += ` p.${key[i]} > 5000000`;
                        break;
                    }
                }
                
            }
        }
    }
    console.log(condition)
    return condition
}

module.exports = generateFilterQuery