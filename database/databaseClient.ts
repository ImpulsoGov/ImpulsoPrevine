export type DatabaseClient = Readonly<{
    // biome-ignore lint/suspicious/noExplicitAny: mocking query parameters
    query: <T>(sql: string, params?: any[]) => Promise<T>;
  }>;
  
  