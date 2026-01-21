import { useState } from 'react'
import type { RefundMetadataRequest } from '../../types/refund'

const DEFAULT_FORM: RefundMetadataRequest = {
  requestType: 'RETURN',
  purchaseChannel: 'ONLINE',
  purchaseDate: '',
  orderId: '',
  description: '',
}

export const useRefundIntakeForm = () => {
  const [formData, setFormData] = useState<RefundMetadataRequest>(DEFAULT_FORM)
  const [image, setImage] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const updateField = <K extends keyof RefundMetadataRequest>(
    key: K,
    value: RefundMetadataRequest[K]
  ) => {
    setSubmitted(false)
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    const payload = {
      metadata: formData,
      image,
    }

    // TODO: wire to backend with createRefundIntake when API is ready to use here.
    console.info('Refund intake payload (draft):', payload)
  }

  return {
    formData,
    image,
    submitted,
    setImage,
    updateField,
    handleSubmit,
  }
}
