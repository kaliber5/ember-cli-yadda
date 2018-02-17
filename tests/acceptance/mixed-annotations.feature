@acceptance
@smoke
Feature: run in acceptance or smoke test

  @smoke
  Scenario: runs in smoke tests

    Given this scenario has annotation @smoke
    And the config specifies the @smoke annotation
    When I look at the test results
    Then the assert in the given step should be shown as a success

  @acceptance
  Scenario: runs in acceptance test

    Given this scenario has annotation @acceptance
    And the config specifies the @acceptance annotation
    When I look at the test results
    Then the assert in the given step should be shown as a success
