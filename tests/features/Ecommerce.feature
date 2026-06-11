Feature: Ecommerce Website validation

  @regression
  Scenario: Place the order successfully(Positive scenario)
    Given I login to the ecommerce website with username "namithadsouza99@gmail.com" and password "Namitha@98"
    When I add the product "ZARA COAT 3" to the cart
    Then verify that the product "ZARA COAT 3" is added to the cart
    When I proceed to checkout and place the order
    Then verify that the order is placed successfully

  @smoke
  Scenario Outline: Invalid login to Ecommerce2 application(Negative scenario)l̥
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username           | password          |
      | anshikaw@gmail.com | Learning@830$3mK3 |
