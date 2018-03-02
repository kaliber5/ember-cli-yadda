@acceptance
Feature: run in acceptance test, scenario run/not run

  @notRun
  Scenario: not run because has @notRun annotation

    Given this scenario has annotation @notRun
    And the config specifies the @acceptance annotation
    When I look at the test results
    Then the assert in the given step should not be shown as a failure

  Scenario: not run because has no annotation

    Given this scenario does not have an annotation
    And the config specifies the @acceptance annotation
    When I look at the test results
    Then the assert in the given step should not be shown as a failure

  @acceptance
  Scenario: runs in acceptance test

    Given this scenario has annotation @acceptance
    And the config specifies the @acceptance annotation
    When I look at the test results
    Then the assert in the given step should be shown as a success
