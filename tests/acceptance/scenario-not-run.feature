Feature: scenario not run

  @smoke
  Scenario: this scenario does not run

    Given this scenario will not be run
    When I look at the test results
    Then the assert in the given step should not be shown as a failure

  Scenario: this scenario does run

    Given this scenario will be run
    When I look at the test results
    Then the assert in the given step should be shown as a success
