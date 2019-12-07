Scraping Reddit
========
May 2019 - Present
------------------
## Version 2.0 of my first independent project which explored creating a Reddit comment scraper with Node.js.

### Overview:
Node.js app built with the ultimate goal of scraping Reddit comments to utilize NLP/ML processes for tracking user/troll/bot behaviors in order to recognize disinformation patterns and analyze sentiment within a subreddit community.

### State of project:
The project is still in development and currently receiving less attention while I am focused on another project. There are several other features I would like to implement that would track and analyse disinformation campaigns. This app is not currently out-of-the-box user-friendly, but I intend to make the interface more robust in a future update.

### How to run and use:
- Clone and npm install dependencies. 
- Configure `example.env` with user settings in the format provided.  
- Navigate to app homepage at localhost://2026. 
- Click on 'Create a scrape' to go to the scrape form. 
- Input a valid Reddit comment thread URL to analyse. 

NOTE: Currently only accepts the following format:
`https://www.reddit.com/r/legaladvice/comments/34l7vo/ma_postit_notes_left_in_apartment/`

After filling your desired URL, choose between 2 scrape sources:
- Request JSON directly from Reddit. 
- Archived version of the comment thread from Pushshift.

Choose what method to have the response displayed returned in:
- List method will grab each comment and its metadata along with any subsequent child response, then flatten all threads found.
- Sort method will only target each comment's `author: comment` and then sort the results by `author`.

NOTE:  Using either of the Reddit scrape methods will not yield a complete set of comments due to Reddit not serving more than ~1500 comments. Pushshift's methods will serve a complete dataset, but all of comments' scores will generally be incorrect. This is due to how and when Pushshift grabs comments for archival.

### Files Included with this project:

### Version 2.0 Design Decisions & Project Issues:
See the [Version 1.0]() methodology page for an in depth explanation into the decisions and problems from the first version.

  

After a short break from building v.1.0, I attained a deeper understanding of various JavaScript foundational concepts and wanted to apply these lessons through creating a second version of the scraper that would address many of the flawed design approaches that were either inefficient or insecure.

The first of these design changes was to use industry best practices in app structure to make the app scalable and less error prone.
This also allowed me to make the app fundamentally more modular, which in turn solves scalability and error proneness. When creating functions, taking care to not repeat code by making them general purpose and placing them into a helper module that can be used throughout my app. And finally, understand when to use `let` vs `const` vs `var` throughout the application.

I searched out unnecessary/outdated modules & practices in building an Express application and removed anything unnecessary that was included during the generation of an Express application.  During this process I realized that a better error handling solution was needed, and I chose to use Winston. At the time, I made this decision because it seemed like Winston was the most popular error handler.

I am now under the impression that I might have been better off using a basic, hand made error handler, because of several issues that arose from Winston v.3.0 that spurred many open issues that had yet to be resolved.  Additionally, I needed to spend more time exploring the various features Winston has and how to handle local errors with it.

After I had decided on the app structure, I wanted to utilize Async-Await & Promises to handle my asynchronous functions. In the process of implementing them, I learned about the error catching pitfalls in asynchronous functions, handling variable instantiation and handing it a value from the resolution of a promise. In using Async-Await, I incorporated more ES6+ syntax while exploring the various ways to use arrow functions in `then()` statements.  By learning about ES6 features, I was able to utilize more destructured Objects.


### Resources:
- [Pushshift.io](https://pushshift.io/)
- [Pushshift Documentation](https://pushshift.io/api-parameters/)
