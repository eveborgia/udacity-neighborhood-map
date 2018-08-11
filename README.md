#Neighborhood Map project

###Project Overview
Develop a single page application featuring a map of my neighborhood and key spots of interest. Add functionality to the map including highlighted locations, including third-party data about the locations and various ways to browse the content.

###Why this Project?
The neighborhood map application is complex enough and incorporates a variety of data points that it can easily become hard to manage. There are a number of frameworks, libraries and APIs available to make this process more manageable and many employers are looking for specific skills in using these packages.

###What will I Learn?
Learn how design patterns assist in developing a manageable codebase. Then explore how JS frameworks can decrease the time required developing an application and provide a number of utilities to use. Finally, implement third-party APIs that provide valuable data sets that can improve the quality of the application.

###How does this help my Career?
Interacting with NPM, and API servers is the primary function of Front-End Web Developers.
Use of third-party libraries and APIs is a standard and acceptable practice that is encouraged.
Asynchronous programming is important to understand in today's market. Using modern technologies like eslint, google maps api and jquery enrich development experience that can extended to many new and future projects.



###The repository contains:

- index.html that contains the HTML for the app, upon load, the js libries required are imported.
- styles.css has the apps styling that gives the app its look/feel.
- app.js contains the app code needed to make the whole thing work, so that the neighborhood locations are displayed and filterable. 
- README.md contains instructions on how to load and use the app, along with notes about why this project.
- node_modules folder is not present in the git repo, but upon `npm install` will pull in node packages. make sure you run `npm install` to install the packages.
- package.json has all the Dependencies required to run the project, including *jquery and knockout*.
- eslintrc.js is there if you want to run a linting feature that helps check your code for errors.
- .eslintignore is a simple file that sets what files/directories to ignore for linting, i've ignored the node_modules directory, but you could ignore other files/folders by editing this file. 
- .gitignore where we ignore the node_modules folder, in future you might want to store your private keys in a a file that is ignored by git.
- Licence.mit - specify that this project is licensed under certain terms.


##Project Details

1. Knockout is used to handle the list, filter, and any other information on the page that is subject to changing state. Tracking click events on list items is handled with Knockout. Also creating the markers as a part of the ViewModel.

2. Asynchrony and Error Handling. APIs used in the project load asynchronously and errors are handled gracefully enough that a user can know when an issue occurs. In case of error (e.g. in a situation where a third party API -*Foresquare* - does not return the expected result) the webpage will alert.

3. Code notes: required to add a full-screen map to the page using the Google Maps API. The map API should be called only once; identifying 10 locations within this neighborhood. The app displays those locations by default when the page is loaded; implement a list view of the set of locations; provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time. This filter is a text input; add functionality using third-party APIs to provide information when a map marker or list view entry is clicked. It was used Foresquare API. Attribution to the data sources/APIs is indicated in the interface and in the README; add functionality to animate a map marker when either the list item associated with it or the map marker itself is selected. It was used Bounce; add functionality to open an infoWindow (location name, address, cathegory) when either a location is selected from the list view or its map marker is selected directly.

4. The app's interface is intuitive to use. For example, the input text area to filter locations is easy to locate. Is easy to understand what set of locations is being filtered. Selecting a location via list item or map marker is making the map marker to bounce and associated info window opens above the map marker with additional information.


### License
This project is licensed under the terms of the MIT license.
