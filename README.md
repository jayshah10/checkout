# Jay Shah Checkout.com submission 
This project is the submission for the ratings submission form exersise 

# How to run 
run 'npm install' to download the required node modules then run 'npm run start' to launch the page. 

# To run tests
run 'npm run test' to run test cases

# Architecture
- The app is split into different pages ( each page is a route defined in the main App.tsx), each page is made up of components which can be 
found in the components folder. 
- The default route will show the user comment entry form as a 'catch all' 
- We use a react context to store entered comments (this can be improved by converting to a session store to maintain comments after a page refresh or use a service api to store comments)
- We have used the mui component library to help build out the ui, it is currently un-skinned.
- The new rating form uses react-hook-form and a zod schema to define what the validation rules are for this object.
- The context hook handles calculating the distribution/average so that this is only re calculated when the values change not each time the component is re-rendered. 

# Features 
- the user can enter a comment, name and email along with a star rating (the star rating is defaulted to 3 if the user doesn't actively change it ), when the user submits the comment it is stored in a context and the user is redirected to the summary page. 
- the summary page shows the user an average rating, a chart of all the different ratings values and the 5 latest comments. The user can go back and enter new comment from the results page. 

# Improvements to do 
- There are some error messages displayed when tests are run due to jsdom vs actual browser in the chart component, this needs to be fixed (doesnt affect the test runs) 
- I needed to add better testing for the chart and validate correct latest comments displayed on the results page, though this is covered in the context test so should work as intended. 
- Replace the current storage of ratings with a service. 
- Add ability to show loading/error states to results components when it has switched to use a service 
- Show that the submission is being made on the new rating form while the service is being called. 
- Improve page styling and color theme etc by creating a custom mui theme. 
- Add cypress end to end / integration testing along with the current unit testing 
- Improve the chart styling and add testing to validate correct bar lengths etc 
- Potentially allow the results page to automatically pull latest results periodically. 
