# GroupProject1
Super Search
Made use of Trello to delegate tasks.

#Requirements:
*Must use at least 2 APIs - yes GuideBox and OMDB
*Must use AJAX to pull data - yes
*Must utilize at least one new library - yes
*Must have a polished front end - yes
*Must meet good quality coding standards - yes
*Must NOT use alerts, confirms, or prompts (no modals) - yes
*Must have some sort of repeating element - yes Cards
*Must use Bootstrap or Alternative CSS Framework - yes Materialize
*Must be Deployed on GitHub Pages or Firebase - yes github
*Must have User Input Validation - yes

#Bonus:
*Make it mobile responsive - yes
*Include materialize - yes
...
#API Suggestions:
*Allow CORS (cross-origin resource sharing) - yes
*Require simple or no authentication - no authentication needed
*Return a JSON response - yes
*Are well documented - yes
*Google some public api’s to use like giphy or Spotify etc.
*SuperSearch Movie Finder
*A place where anyone can search a movie title and easily find out where it's streamable with a subscription such as Netflix, Hulu, etc.

#App Functions:
Step 1: Take the user's search input from the form and make the first API call.

Step 2: Dynamically create a card for each movie result or let the user know they might need to check their spelling. 
2A. Also run the OMDB API for the Runtime data to be added to each card based off the movie title and release year.

Step 3: The user clicks a button to view subscription streaming locations, clicks a button to watch a trailer, or creates a new search.

Step 4: If the Steaming locations button was selected then the app makes another API call to gather that data based off the movie ID which we created with their form submission for each card element. This displays live URLs or lets the user know if there are no subscription platforms hosting this title currently. 

Step 5: If the trailer button was clicked then the app makes another API call to gather that data based off the movie ID which we created with their form submission for each card element. 

Step 6: If they create a new search our app clears the results and finds new data based off their input to the form. 

If the app isn't working it's likely the API key for guidebox. I have 2 saved in there for now but will remove them after it's graded and add directions so people know that you can request a new trial key for free and use that on line 8 to get it working again.


<!--//From a template I found online//-->
<!--## Getting Started-->
<!---->
<!--These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.-->
<!---->
<!--### Prerequisites-->
<!---->
<!--What things you need to install the software and how to install them-->
<!---->
<!--```-->
<!--Give examples-->
<!--```-->
<!---->
<!--### Installing-->
<!---->
<!--A step by step series of examples that tell you how to get a development env running-->
<!---->
<!--Say what the step will be-->
<!---->
<!---->
<!--## Deployment-->
<!---->
<!--Add additional notes about how to deploy this on a live system-->
<!---->
<!--## Built With-->
<!---->
<!--* VSCode -->
<!---->

-------
