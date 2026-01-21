package com.silkycoders.RefundHelper.dto;

import java.time.Instant;
import java.util.UUID;

public record RefundMetadataResponse(
	UUID intakeId,
	UUID conversationId,
	Instant createdAt,
	String status
) {
}
