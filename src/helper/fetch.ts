export class PlanqkError extends Error {
  response: Response

  constructor(response: Response) {
    super(response.statusText)
    this.response = response
  }

  async getErrorMessage(): Promise<string> {
    let body: any
    try {
      body = await this.response.json()
    } catch {
      // ignore
    }

    const errorMessage = body && body.errorMessage ? body.errorMessage : undefined
    return errorMessage ? `${errorMessage} (${this.response.status} - ${this.response.statusText})` : `${this.response.status} - ${this.response.statusText}`
  }
}

export async function fetchOrThrow(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init)
  if (!response.ok) {
    throw new PlanqkError(response)
  }

  return response
}
