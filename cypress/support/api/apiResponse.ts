export const parseApiResponse = <TBody = unknown>(
  response: Cypress.Response<string | TBody>,
): TBody =>
  typeof response.body === 'string' ? (JSON.parse(response.body) as TBody) : response.body;
