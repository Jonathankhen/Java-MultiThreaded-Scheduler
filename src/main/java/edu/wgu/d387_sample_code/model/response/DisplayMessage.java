package edu.wgu.d387_sample_code.model.response;

import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Manages localized messages via resource bundles.
 */
public class DisplayMessage {
    // Holds locale-specific resources
    private final ResourceBundle messageBundle;

    /**
     * Constructor for DisplayMessage using a specified locale.
     *
     * @param locale Locale for retrieving messages.
     */
    public DisplayMessage(Locale locale) {
        // Define the base name for the resource bundle from the locale
        String bundleName = "translation_" + locale.toString().replace('-', '_');
        // Initialize the resource bundle for the given locale
        this.messageBundle = ResourceBundle.getBundle(bundleName, locale);
    }

    /**
     * Fetches the welcome message from the resource bundle.
     *
     * @return Welcome message in the specified locale.
     */
    public String getWelcomeMessage() {
        // Retrieve and return the welcome message
        return messageBundle.getString("welcomeMessage");
    }
}