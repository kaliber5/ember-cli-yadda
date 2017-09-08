@smoke
Feature: feature not run

  Scenario: this does not run

    Given this feature will not be run
    When I look at the test results
    Then the assert in the given step should not be shown as a failure
