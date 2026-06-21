Feature: Task Dashboard Management
  As a logged-in user
  I want to be able to add and delete tasks
  So that I can manage my to-do list effectively

  Background:
    Given the user is authenticated and on the dashboard

  Scenario: Adding a new task to the database
    When the user types "Compile QA Report" into the new task input
    And the user clicks the Add task button
    Then the task "Compile QA Report" should appear in the task list
    
  Scenario: Deleting a task from the database
    Given the user has an existing task "Delete Me Task"
    When the user clicks the delete button for "Delete Me Task"
    Then the task "Delete Me Task" should be removed from the list