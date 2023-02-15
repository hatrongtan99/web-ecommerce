const { filter: keyFilter } = require("../config/key");

const search = (queryStr, fieldName) => {
  const key = queryStr._q
    ? {
        [fieldName]: {
          $regex: queryStr._q,
          $options: "i",
        },
      }
    : {};
  return key;
};

const filter = (queryStr) => {
  let sort = queryStr.sort;
  let query = {};
  if (queryStr.price) {
    query.$or = queryStr.price
      .split(",")
      .map((i) => ({ price: keyFilter.price[i] }));
  }

  if (queryStr.type) {
    queryFilter(queryStr, "specialField", query, "type");
  }

  if (queryStr.powerType) {
    queryFilter(queryStr, "specialField", query, "powerType");
  }

  if (queryStr.wattage) {
    queryFilter(queryStr, "specialField", query, "wattage");
  }

  if (queryStr.battery) {
    queryFilter(queryStr, "specialField", query, "battery");
  }

  if (sort) {
    sort = sort == "asc" ? 1 : sort == "desc" ? -1 : 0;
  }
  ["sort", "price", "type", "powerType", "wattage", "battery"].forEach(
    (key) => delete queryStr[key]
  );
  query = { ...query, ...queryStr };
  return { sort, query };
};

const queryFilter = (queryStr, field, query, type) => {
  const idType = queryStr[type].split(",");
  const obj = {
    [field]: {
      $in: idType.map((id) => {
        const item = keyFilter.filter.specialField[type].find(
          (item) => item.id == id
        );
        if (item) {
          return {
            [item.filter]: item.title,
          };
        }
      }),
    },
  };
  query.$and ? query.$and.push(obj) : (query.$and = [obj]);
};

module.exports = {
  search,
  filter,
};
