package com.silkycoders1.jsystemssilkycodders1.model;

import java.time.Instant;

public record ChatMessage(Role role, String content, Instant timestamp) {
}
