export type RequestType = 'RETURN' | 'COMPLAINT'

export type PurchaseChannel = 'ONLINE' | 'IN_STORE'

export interface RefundMetadataRequest {
  requestType: RequestType
  purchaseChannel: PurchaseChannel
  purchaseDate: string
  orderId: string
  description: string
}

export interface RefundMetadataResponse {
  intakeId: string
  conversationId: string
  createdAt: string
  status: 'RECEIVED'
}

export interface RefundMetadataMultipart {
  metadata: RefundMetadataRequest
  image: File
}
