import type { RefundMetadataMultipart } from '../types/refund'

export const buildRefundMetadataFormData = (
  payload: RefundMetadataMultipart
): FormData => {
  const formData = new FormData()
  const metadataBlob = new Blob([JSON.stringify(payload.metadata)], {
    type: 'application/json',
  })

  formData.append('metadata', metadataBlob)
  formData.append('image', payload.image)

  return formData
}
