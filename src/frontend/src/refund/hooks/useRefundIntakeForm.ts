import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createRefundIntake } from '../../api/refundIntake'
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
  const [localError, setLocalError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const intakeMutation = useMutation({
    mutationFn: createRefundIntake,
    onSuccess: (response) => {
      setSuccessMessage(`Submitted. Intake ID: ${response.intakeId.slice(0, 8)}`)
    },
  })

  const updateField = <K extends keyof RefundMetadataRequest>(
    key: K,
    value: RefundMetadataRequest[K]
  ) => {
    setSubmitted(false)
    setLocalError(null)
    setSuccessMessage(null)
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setLocalError(null)
    setSuccessMessage(null)

    if (!image) {
      setLocalError('Please attach a product photo.')
      return
    }

    await intakeMutation.mutateAsync({
      metadata: formData,
      image,
    })
  }

  return {
    formData,
    image,
    submitted,
    isSubmitting: intakeMutation.isPending,
    error: localError ?? (intakeMutation.error?.message ?? null),
    successMessage,
    setImage,
    updateField,
    handleSubmit,
  }
}
