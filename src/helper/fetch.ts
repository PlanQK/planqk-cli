export class PlanqkError extends Error {
  response: Response

  constructor(response: Response) {
    super(response.statusText)
    this.response = response
  }

  async getErrorMessage(): Promise<string> {
    return getErrorMessage(this.response)
  }
}

export const fetchOrThrow = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const response = await fetch(input, init)
  if (!response.ok) {
    throw new PlanqkError(response)
  }

  return response
}

export const getErrorMessage = async (response: Response): Promise<string> => {
  let body: any
  try {
    body = await response.json()
  } catch {
    // ignore
  }

  const errorMessage = body && body.errorMessage ? body.errorMessage : undefined
  return errorMessage ? `${errorMessage} (${response.status} - ${response.statusText})` : `${response.status} - ${response.statusText}`
}
