package com.silkycoders.RefundHelper.service;

import com.silkycoders.RefundHelper.dao.RefundMetadataDao;
import com.silkycoders.RefundHelper.dto.RefundMetadataRequest;
import com.silkycoders.RefundHelper.dto.RefundMetadataResponse;
import com.silkycoders.RefundHelper.model.ImageInfo;
import com.silkycoders.RefundHelper.model.RefundMetadataRecord;
import java.time.Instant;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RefundMetadataService {
	private final RefundMetadataDao refundMetadataDao;

	public RefundMetadataService(RefundMetadataDao refundMetadataDao) {
		this.refundMetadataDao = refundMetadataDao;
	}

	public RefundMetadataResponse createIntake(RefundMetadataRequest request, MultipartFile image) {
		if (image == null || image.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image is required.");
		}

		UUID intakeId = UUID.randomUUID();
		UUID conversationId = UUID.randomUUID();
		Instant createdAt = Instant.now();
		ImageInfo imageInfo = new ImageInfo(image.getOriginalFilename(), image.getSize(), image.getContentType());

		RefundMetadataRecord record = new RefundMetadataRecord(
			intakeId,
			conversationId,
			request.requestType(),
			request.purchaseChannel(),
			request.purchaseDate(),
			request.orderId(),
			request.description(),
			imageInfo,
			createdAt
		);

		refundMetadataDao.save(record);

		return new RefundMetadataResponse(intakeId, conversationId, createdAt, "RECEIVED");
	}
}
