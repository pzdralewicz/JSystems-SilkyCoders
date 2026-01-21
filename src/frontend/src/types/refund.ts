export type RequestType = 'RETURN' | 'COMPLAINT'

export type PurchaseChannel = 'ONLINE' | 'IN_STORE'

export type RefundMetadataRequest = {
  requestType: RequestType
  purchaseChannel: PurchaseChannel
  purchaseDate: string
  orderId: string
  description: string
}

export type RefundMetadataResponse = {
  intakeId: string
  conversationId: string
  createdAt: string
  status: 'RECEIVED'
}
