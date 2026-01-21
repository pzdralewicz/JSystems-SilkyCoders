import type { PurchaseChannel, RequestType } from '../types/refund'
import { useRefundIntakeForm } from './hooks/useRefundIntakeForm'
import './RefundIntakeForm.css'

export const RefundIntakeForm = () => {
  const {
    formData,
    image,
    submitted,
    isSubmitting,
    error,
    successMessage,
    setImage,
    updateField,
    handleSubmit,
  } = useRefundIntakeForm()

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">RefundHelper</p>
        <h1>Return & Complaint Intake</h1>
        <p className="subhead">
          Collect refund metadata and product photo. We will wire this to the
          backend intake endpoint next.
        </p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <section className="section">
          <h2>Request details</h2>
          <div className="grid">
            <label className="field">
              <span>Request type</span>
              <select
                value={formData.requestType}
                onChange={(event) =>
                  updateField(
                    'requestType',
                    event.target.value as RequestType
                  )
                }
              >
                <option value="RETURN">Return</option>
                <option value="COMPLAINT">Complaint</option>
              </select>
            </label>

            <label className="field">
              <span>Purchase channel</span>
              <select
                value={formData.purchaseChannel}
                onChange={(event) =>
                  updateField(
                    'purchaseChannel',
                    event.target.value as PurchaseChannel
                  )
                }
              >
                <option value="ONLINE">Online</option>
                <option value="IN_STORE">In store</option>
              </select>
            </label>

            <label className="field">
              <span>Purchase date</span>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(event) =>
                  updateField('purchaseDate', event.target.value)
                }
                required
              />
            </label>

            <label className="field">
              <span>Order ID</span>
              <input
                type="text"
                placeholder="ORD-12345"
                value={formData.orderId}
                onChange={(event) =>
                  updateField('orderId', event.target.value)
                }
                required
              />
            </label>
          </div>

          <label className="field">
            <span>Description</span>
            <textarea
              placeholder="Describe the issue or reason for return."
              value={formData.description}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
              rows={4}
              required
            />
          </label>
        </section>

        <section className="section">
          <h2>Product photo</h2>
          <label className="field">
            <span>Upload image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImage(event.target.files ? event.target.files[0] : null)
              }
              required
            />
          </label>
          {image ? (
            <p className="hint">
              Selected: {image.name} ({Math.round(image.size / 1024)} KB)
            </p>
          ) : (
            <p className="hint">No image selected yet.</p>
          )}
        </section>

        <section className="section">
          <button className="primary" type="submit">
            {isSubmitting ? 'Submitting…' : 'Submit intake'}
          </button>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          {submitted && !error && !successMessage && (
            <p className="success">
              Intake ready to submit.
            </p>
          )}
        </section>
      </form>
    </div>
  )
}
