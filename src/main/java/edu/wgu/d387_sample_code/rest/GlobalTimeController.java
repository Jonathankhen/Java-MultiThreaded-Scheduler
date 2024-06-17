package edu.wgu.d387_sample_code.rest;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/time")
@CrossOrigin(origins = "http://localhost:4200")
public class GlobalTimeController {

    @GetMapping("/convert")
    public String convertTimeZone(@RequestParam(required = false, defaultValue = "UTC") String timeZone) {
        return GlobalTimeConverter.convertTimeToAllZones(timeZone);
    }
}
