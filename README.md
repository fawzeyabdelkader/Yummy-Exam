* This is a site that uses HTML, Css, Bootstrap, javascript, jquery, Ajax, regex, and Feath API.
* HTML, CSS, Bootstrap: Use these for structuring and styling your website, including the side nav menu, search inputs, category, area, and ingredient displays, meal details, and contact form. JavaScript, jQuery: Use JavaScript and jQuery for handling interactions and dynamic content. For example, you can use jQuery to animate the appearance of links in the side nav menu and to handle AJAX requests for fetching and displaying meal data. Regex: Use Regex to validate inputs in your sign-up form and possibly in other parts of your website where input validation is required. Feather API: Use the Feather API to fetch meal data and display it on your website. You can use AJAX to make requests to the API and update the content of your page based on the API response. Dynamic Content: Use JavaScript and jQuery to dynamically update the content of your page based on user interactions, such as clicking on a category, area, or ingredient. Initial Meals Display: Use AJAX to fetch initial meals when the website is first opened, using the search API with the name field left empty. Meal Details: Use JavaScript and jQuery to display meal details when a meal is clicked, including the picture, meal name, instructions, area, category, recipes, tags, meal source, and YouTube link. Form Submission: Use jQuery to handle form submission for the sign-up form, including validating inputs with Regex and enabling
* We have a side nav menu that when we open it, links appear with an animation like this, and they are search, categories, area, ingredients, contact us.
The first thing is that the search shows me two inputs
The first one does a search with meal name
The second one does a sersh with the meal first letter
The second thing is that the categories show me the meals categories, and if I click on any category at all times, it will bring me the meals in this category.
The third thing is area, and here it brings me the meals area. Also, if I click on any area, it will bring me the meals available in this country.
The fourth thing is the ingredients, and here it shows me the main ingredient for each meal. If I click on any ingredient, it will bring me the meals that were made with this ingredient.
The last thing is contact us, and this shows me the inputs for the sign up form
We used the regex and the submit button will remain disabled to some extent. The regex that is applied to all inputs will return true, then the button will remain enabled.
If I open anything from the above, it will show me the meals, and here we are showing only 20 meals from our response
If I open any meal, it shows me its details
It shows me a picture of the meal and the meal name, instructions, area, category, recipes, tags, meal source, and meal in YouTube
The last thing is that the first time I open the website, some meals will appear for me. Here we used the search API, but we left the name in the API empty.
- This is the API that I used
https://www.themealdb.com/api.php 
