Feature: Create and Apply Support Patch for a Venue

    Scenario: Log into portal for the venue
        When I login into venue admin portal with credentials with "VENUE_SAMPLE_TEST_USER" and password "VENUE_SAMPLE_TEST_PASSWORD"
        Then I see I am logged into admin portal

    Scenario: Complete device linking successfully
        When I click on Get Started and enter device code
