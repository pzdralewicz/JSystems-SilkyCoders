package com.silkycoders.RefundHelper.dao;

import com.silkycoders.RefundHelper.model.RefundMetadataRecord;
import java.util.Optional;
import java.util.UUID;

public interface RefundMetadataDao {
	RefundMetadataRecord save(RefundMetadataRecord record);

	Optional<RefundMetadataRecord> findById(UUID intakeId);
}
