package com.silkycoders.RefundHelper.model;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public class RefundMetadataRecord {
	private final UUID intakeId;
	private final UUID conversationId;
	private final RequestType requestType;
	private final PurchaseChannel purchaseChannel;
	private final LocalDate purchaseDate;
	private final String orderId;
	private final String description;
	private final Instant createdAt;

	public RefundMetadataRecord(
		UUID intakeId,
		UUID conversationId,
		RequestType requestType,
		PurchaseChannel purchaseChannel,
		LocalDate purchaseDate,
		String orderId,
		String description,
		Instant createdAt
	) {
		this.intakeId = intakeId;
		this.conversationId = conversationId;
		this.requestType = requestType;
		this.purchaseChannel = purchaseChannel;
		this.purchaseDate = purchaseDate;
		this.orderId = orderId;
		this.description = description;
		this.createdAt = createdAt;
	}

	public UUID getIntakeId() {
		return intakeId;
	}

	public UUID getConversationId() {
		return conversationId;
	}

	public RequestType getRequestType() {
		return requestType;
	}

	public PurchaseChannel getPurchaseChannel() {
		return purchaseChannel;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public String getOrderId() {
		return orderId;
	}

	public String getDescription() {
		return description;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}
}
