# Group Activity Planning - Vue.js Front-End Repo

Name: John Dennehy (20091408)

## Overview.

A Vue.js client web application that allows users to plan and organise group activities with their friends.

## User Features

- User Registration and User Login
- Toast notifications on user registration and update of user image to inform user of updates (optimal UX)
- User email confirmation via account confirmation page (JWT query parameter sent to back-end to validate user information)
- Dashboard page which renders user created events and user invited events
- Ability to create events for each category (Domestic day event, Domestic overnight event, Foreign overnight event)
- Ability to delete / edit user created events
- View event details on event detail page (event overview, itinerary, web-scraped information, chat messsages)
- Update account settings (user profile image, user email, user password)
- Polls functionality to obtain most suitable dates for group activity
- Emails service which notifies all event participants at each key event touchpoint (poll created, poll completed, itinerary completed)
- Instant chat functionality on event detail page so that event users can discuss event details (via websockets)
- CRUD implementation for event itinerary
- Event creators can finalise event itinerary (triggers event itinerary email to each event participant)
- View web-scraped accommodation information for event destination city and update event itinerary with selection
- For events that will take place in a foreign city, view web-scraped flight information for event destination city
- View local tourist attractions for event destination city (results obtained via Google Places API)

## Live Site Url

The site is deployed at the following URL: https://group-activity-planning.netlify.app/

## Setup requirements.

- Open the command line
- Enter the following command in the terminal -
  `git clone https://github.com/JohnDennehy101/vuejs-frontend-FYP`
- Locate the the downloaded folder in the terminal and enter using the following command -
  `cd vuejs-frontend-FYP`
- Now project dependencies need to be installed, enter the following command in the terminal - `npm install`
- The site uses the Mapbox API to render maps on the event detail page. You need to create an API key for use in the site. To do this follow steps 1-4 at https://docs.mylistingtheme.com/article/how-to-generate-a-mapbox-api-key/
- To get the app functional, a .env file needs to be added to the project. To do this, enter the following command - `touch .env`
- The .env file should now be created. To edit this file, enter the following - `nano .env`
- A nano editor should now be displayed in terminal with the .env file open. This now needs to be populated with the relevant environment variables list below.

  - VUE_APP_MAPBOX_API_KEY={Put your API Mapbox key here}
  - VUE_APP_SOCKET_ENDPOINT=http://localhost:3000

- Save the .env file `(Ctrl + O)`
- To exit the file enter `(Ctrl + X)`
- You need to have the Nest.js back-end service and the Python Flask web-scraping API running locally also for the front-end to function.
  For instructions on how to get these running locally, please see README.md documents at https://github.com/JohnDennehy101/web-scraper-FYP and https://github.com/JohnDennehy101/nestjs-backend-FYP
- Once you have the Nest.js back-end service and the Python Flask web-scraping API running locally, enter `npm run serve ` to get the project running locally on localhost.
- You can then navigate to the site locally at `http://localhost:8080/`
- To stop the Vue.js local client, hit CTRL and C in the terminal to kill the process.
