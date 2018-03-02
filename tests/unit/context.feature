@context
Feature: ember unit test

  Scenario: has context

    When I have no annotations
    Then the test context should have "owner"
    And the test context should have "set"
    And the test context should have "get"
