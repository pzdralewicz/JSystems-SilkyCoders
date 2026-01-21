package com.silkycoders.RefundHelper.controller;

import com.silkycoders.RefundHelper.dto.RefundMetadataRequest;
import com.silkycoders.RefundHelper.dto.RefundMetadataResponse;
import com.silkycoders.RefundHelper.service.RefundMetadataService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/intake")
public class RefundMetadataController {
	private final RefundMetadataService refundMetadataService;

	public RefundMetadataController(RefundMetadataService refundMetadataService) {
		this.refundMetadataService = refundMetadataService;
	}

	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public RefundMetadataResponse createIntake(
		@Valid @RequestPart("metadata") RefundMetadataRequest request,
		@RequestPart("image") MultipartFile image
	) {
		return refundMetadataService.createIntake(request, image);
	}
}
