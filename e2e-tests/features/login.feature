Feature: User Authentication
  As a registered user
  I want to log into my account
  So that I can access my task dashboard

  Scenario: Successful Login with valid credentials
    Given the user navigates to the login page
    When the user enters the email "test_qa@example.com"
    And the user enters the password "Systems123!"
    And the user checks the agreement checkbox
    And the user clicks the Sign in button
    Then the system should process the login and redirect to the dashboard
