package com.silkycoders.RefundHelper.dao;

import com.silkycoders.RefundHelper.model.RefundMetadataRecord;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryRefundMetadataDao implements RefundMetadataDao {
	private final ConcurrentHashMap<UUID, RefundMetadataRecord> storage = new ConcurrentHashMap<>();

	@Override
	public RefundMetadataRecord save(RefundMetadataRecord record) {
		storage.put(record.getIntakeId(), record);
		return record;
	}

	@Override
	public Optional<RefundMetadataRecord> findById(UUID intakeId) {
		return Optional.ofNullable(storage.get(intakeId));
	}
}
