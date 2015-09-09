Feature: write a nice feature

  Scenario: the one where I type ember g feature

    Given I type "Ember g feature make-feature"
    When I look in the folder
    Then I should find a file
