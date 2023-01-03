export class QueryHelper {
  static getPaginationQuery(page: number, perPage: number): { skip: number; take: number } {
    return {
      skip: Math.max((page - 1) * perPage, 0),
      take: Math.max(perPage, 1),
    };
  }

  static getPaginationResponse(page: number, take: number, total: number): { page: number; pages: number } {
    return {
      page: Math.max(page, 1),
      pages: Math.ceil(total / take),
    };
  }
}
