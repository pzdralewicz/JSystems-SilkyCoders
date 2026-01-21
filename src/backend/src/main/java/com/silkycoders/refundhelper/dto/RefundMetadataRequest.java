package com.silkycoders.RefundHelper.dto;

import com.silkycoders.RefundHelper.model.PurchaseChannel;
import com.silkycoders.RefundHelper.model.RequestType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record RefundMetadataRequest(
	@NotNull RequestType requestType,
	@NotNull PurchaseChannel purchaseChannel,
	@NotNull @PastOrPresent LocalDate purchaseDate,
	@NotBlank @Size(max = 64) String orderId,
	@NotBlank @Size(max = 1000) String description
) {
}
