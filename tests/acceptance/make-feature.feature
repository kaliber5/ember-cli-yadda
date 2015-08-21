Feature: make feature

Scenario:

  Given I type "Ember g feature make-feature"
  When I look in the folder
  Then I shoud find a file
