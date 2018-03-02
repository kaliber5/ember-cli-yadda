@rendering
Feature: my component

  Scenario: component can render

    When I render the component with "foo"
    Then I should see the text "foo"
