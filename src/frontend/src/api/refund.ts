import { buildRefundMetadataFormData } from '../lib/refundFormData'
import { postFormData } from '../lib/http'
import type {
  RefundMetadataMultipart,
  RefundMetadataResponse,
} from '../types/refund'

export const createRefundIntake = async (
  payload: RefundMetadataMultipart,
): Promise<RefundMetadataResponse> => {
  const formData = buildRefundMetadataFormData(payload)

  return postFormData<RefundMetadataResponse>('/api/intake', formData)
}
