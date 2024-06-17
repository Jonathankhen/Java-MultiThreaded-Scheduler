package edu.wgu.d387_sample_code.rest;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

@CrossOrigin(origins = "http://localhost:4200")
public class GlobalTimeConverter {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("HH:mm");
    private static final Map<String, String> ZONES = new LinkedHashMap<>();

    static {
        // Explicitly defining the order of zones to ensure consistent display
        ZONES.put("ET", "America/New_York");
        ZONES.put("MT", "America/Denver");
        ZONES.put("UTC", "UTC");
    }

    public static String convertTimeToAllZones(String userTimeZone) {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of(userTimeZone));
        Map<String, ZonedDateTime> orderedTimes = new TreeMap<>();

        // Always calculate and store all zones
        ZONES.forEach((label, zone) -> {
            orderedTimes.put(label, now.withZoneSameInstant(ZoneId.of(zone)));
        });

        // Check if user time zone is part of the predefined zones
        String userZoneLabel = ZONES.entrySet().stream()
                .filter(entry -> entry.getValue().equals(userTimeZone))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        StringBuilder timeString = new StringBuilder();
        if (userZoneLabel != null) {
            // If user's time zone is one of the predefined, start with it
            timeString.append(orderedTimes.get(userZoneLabel).format(FORMATTER))
                    .append(" ").append(userZoneLabel);
            orderedTimes.remove(userZoneLabel); // Remove to avoid duplicate
        }

        // Append the rest of the times in the specific order
        orderedTimes.forEach((label, zonedTime) -> {
            if (timeString.length() > 0) timeString.append(", ");
            timeString.append(zonedTime.format(FORMATTER)).append(" ").append(label);
        });

        return timeString.toString();
    }
}
