# Assignment 4

> - As I stated last week, I will be creating a pizza factory that only serves pizzas but with many variations and toppings.
> I implemented 5 variants of pizzas, including cheese, pepperoni, mushroom, veggie, and deluxe.
> I also chose seven toppings that can be served with these variants.
> They are pepperoni, mushroom, pepper, olive, onion, basil, and pineapple.
> Cheese pizza is the most basic one with no toppings, pepperoni pizza only has pepperoni topping, mushroom pizza only has mushroom topping.
> Veggie pizza include all vegeterian toppings including all toppings except for pepperoni.
> Deluxe pizza is the most premium pizza that serves with all seven toppings.
> However, I decided not to make pizzas get served with same number of toppings even though the total number of topping types will always be the same.
> For example, the mushroom pizza sometimes will come with 5 mushrooms and sometimes will come with 10 mushrooms (range between 5 and 10).
> This topping logic applies to all pizza variants to make sure the pizzas feel organic, not just a duplicate of one another.
>
> - I decided to implement user interactions by allowing users to pick the variant they would like through pressing different keys.
> For example, 'c' represents cheese pizza, 'm' represents mushroom pizza, 'p' represents pepperoni pizza, 'v' represents veggie pizza, and 'd' represents deluxe pizza.
> Also, if the user presses 'r' key, it will randomly choose one of those five variants for users. 
> I also decided to automatically generate pizzas in random variants for users at the start so that users can have a quick glance of what the pizzas look like.
> To make it user-friendly, I enabled the 'a' key so that users can toggle between automatic and manually placing pizzas only. 
> Even if it is in the automatic mode, the user can still manually place pizzas.
> I also allow users to remove pizzas from the canvas just by clicking on the pizza they dislike.
> Another user-friendly design I made here is that I created this scale out-in effect for any pizza that is placed on the canvas for the first time to help users identify which pizza is the freshest (newest).
> To ensure an organic pattern of pizzas, I used many random() in my pizza functions to simulate different sizes, types, positions, and topping amount.
