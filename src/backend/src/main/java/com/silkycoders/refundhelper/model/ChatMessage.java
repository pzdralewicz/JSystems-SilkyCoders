package com.silkycoders.RefundHelper.model;

import java.time.Instant;

public record ChatMessage(Role role, String content, Instant timestamp) {
}


