export class BadRequestError extends Error {}

export function handleError(error: Error) {
  if (error instanceof BadRequestError) {
    return Response.json({ message: error.message }, { status: 400 });
  }

  return Response.json(
    {
      message: 'Erro ao consultar dados',
      detail : (error).message
    },
    { status: 500 }
  );
}
