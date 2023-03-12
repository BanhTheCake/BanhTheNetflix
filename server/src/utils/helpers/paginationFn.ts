interface PaginationProps {
  page: number;
  limit: number;
  total: number;
}

const paginationFn = ({ page, limit, total }: PaginationProps) => {
  const totalPage = Math.ceil(total / limit);
  return {
    page: page,
    limit: limit,
    totalPage: totalPage,
    totalResult: total,
  };
};

export default paginationFn;
