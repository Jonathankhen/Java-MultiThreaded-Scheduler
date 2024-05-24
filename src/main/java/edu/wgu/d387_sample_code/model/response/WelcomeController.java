package edu.wgu.d387_sample_code.model.response;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Controller to provide welcome messages across various locales.
 */
@RestController
public class WelcomeController {
    // DisplayMessage instance for English locale
    private final DisplayMessage englishMessageDisplay;

    /**
     * Initializes the DisplayMessage instance with English locale.
     */
    public WelcomeController() {
        this.englishMessageDisplay = new DisplayMessage(new Locale("en", "US"));
    }

    /**
     * Endpoint providing welcome messages in English and French.
     * @return List of localized welcome messages.
     */
    @CrossOrigin(origins = "http://localhost:4200") // Allows requests from specified origin
    @GetMapping("/welcome")
    public List<String> getWelcomeMessages() {
        // Get English welcome message
        String englishMessage = englishMessageDisplay.getWelcomeMessage();

        // Create DisplayMessage for French locale and get message
        DisplayMessage frenchMessageDisplay = new DisplayMessage(new Locale("fr", "CA"));
        String frenchMessage = frenchMessageDisplay.getWelcomeMessage();

        // Return list containing both messages
        return Stream.of(englishMessage, frenchMessage).collect(Collectors.toList());
    }
}