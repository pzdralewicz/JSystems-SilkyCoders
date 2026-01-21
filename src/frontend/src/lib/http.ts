const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
}

export const postFormData = async <TResponse>(
  path: string,
  formData: FormData
): Promise<TResponse> => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with ${response.status}`)
  }

  return (await response.json()) as TResponse
}
