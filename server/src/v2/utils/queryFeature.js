class QueryFeature {
    constructor(instanceQuery, queryStr) {
        this.instanceQuery = instanceQuery;
        this.queryStr = queryStr;
    }

    search() {
        const key = this.queryStr._q
            ? {
                  name_product: {
                      $regex: this.queryStr._q,
                      $options: 'i',
                  },
              }
            : {};
        this.instanceQuery = this.instanceQuery.find(key);
        return this;
    }

    filter() {
        const coppyQueryStr = { ...this.queryStr };
        const removeFeild = ['page', '_q', 'limit'];
        removeFeild.forEach((key) => delete coppyQueryStr[key]);
        const sort = removeFeild.sort;
        delete removeFeild.sort;
        let query = JSON.stringify(removeFeild);
        query.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

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
