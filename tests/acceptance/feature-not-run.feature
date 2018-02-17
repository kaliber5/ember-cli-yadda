@notRun
Feature: does not run

  Scenario: does not run

    Given this scenario has annotation @notRun
    And the config does not specify the @notRun annotation
    When I look at the test results
    Then the assert in the given step should not be shown as a failure
