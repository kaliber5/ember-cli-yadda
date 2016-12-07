Feature: top level

  Scenario: the one where I type ember g feature

    Given I type "Ember g feature make-feature"
    When I look in the folder
    Then I should find a file

  @ignore
  Scenario: the one that gets ignored

    Given I have a feature
    When I add the @ignore annotation
    It should not run that scenario