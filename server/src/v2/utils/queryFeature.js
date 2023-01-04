class QueryFeature {
    constructor(instanceQuery, queryStr) {
        this.instanceQuery = instanceQuery;
        this.queryStr = queryStr;
    }

    filter() {
        const coppyQueryStr = { ...this.queryStr };
        const removeFeild = ['page', '_q', 'limit'];
        removeFeild.forEach((key) => delete coppyQueryStr[key]);
        const sort = coppyQueryStr.sort;
        delete coppyQueryStr.sort;
        let query = JSON.stringify(coppyQueryStr);
        query = query.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        if (sort) {
            this.instanceQuery = this.instanceQuery
                .find(JSON.parse(query))
                .sort({ price: sort == 'asc' ? 1 : -1 });
        } else {
            this.instanceQuery = this.instanceQuery.find(JSON.parse(query));
        }
        return this;
    }

    paginations() {}
}

const search = (queryStr, fieldName) => {
    const key = queryStr._q
        ? {
              [fieldName]: {
                  $regex: queryStr._q,
                  $options: 'i',
              },
          }
        : {};
    return key;
};

const filter = (queryStr) => {
    const coppyQueryStr = { ...queryStr };
    const removeFeild = ['page', '_q', 'limit'];
    removeFeild.forEach((key) => delete coppyQueryStr[key]);
    let sort = coppyQueryStr.sort;
    delete coppyQueryStr.sort;
    let query = JSON.stringify(coppyQueryStr);
    query = query.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    return { sort: sort == 'asc' ? 1 : -1, query: JSON.parse(query) };
};

module.exports = {
    search,
    filter,
};
