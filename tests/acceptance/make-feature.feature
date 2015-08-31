Feature: make feature

  Scenario: Maak er eerst maar s een

    Given I type "Ember g feature make-feature"
    When I look in the folder
    Then I should find a file

  Scenario: Maak er nog maar s een

    Given I type "Ember g feature make-feature"
    When I look in the folder
    Then I should find a file or three
