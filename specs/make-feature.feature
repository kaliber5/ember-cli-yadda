Feature: make feature

Scenario: generate

  Given I type "Ember g feature make feature"
  When I look in the folder
  Then I should find a file
