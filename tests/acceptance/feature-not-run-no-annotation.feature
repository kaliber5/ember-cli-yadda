Feature: does not run when have annotations

  Scenario: fails if there is an annotation

    Given the feature this scenario belongs in does not have an annotation
    When the config does not specify any annotations
    Then this test passes
