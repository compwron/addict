module.exports.parseQuery = query => {
  const fields = query._fields ? query._fields.split(',') : undefined;
  const q = query._q;
  const start = query._start;
  const end = query._end;
  const limit = query._limit;
  const page = query._page;
  const sort = query._sort ? query._sort.split(',') : undefined;
  const order = (query._order ? query._order.split(',') : ['asc']).map(s =>
    s.toLowerCase()
  );
  delete query._fields;
  delete query._q;
  delete query._start;
  delete query._end;
  delete query._limit;
  delete query._page;
  delete query._sort;
  delete query._order;
  const filter = Object.keys(query).length > 0 ? query : undefined;
  return {
    fields,
    filter,
    q,
    start,
    end,
    page,
    limit,
    sort,
    order
  };
};
