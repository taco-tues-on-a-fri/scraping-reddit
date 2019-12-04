**** Learned many mistakes from callback hell, and this version is aiming to implement async-await and promises while attempting to keep things far more modular.

Scraping Reddit
========
May 2019 - Present
------------------

### Version 2.0 of my first independent project which explored creating a Reddit comment scraper with Node.js. 

- Describe very briefly but clearly what the project does.
- Reddit comment scraper with the ultimate goal of utilizing NLP/ML processes to track user/troll/bot behavior to recognize disinformation patterns and analyze sentiment within a subreddit community.
- 
- State if it is out-of-the-box user-friendly, so it’s clear to the user.
- Not currently out-of-the-box user-friendly, but intend to implement this in a future update.
- 
- List its most useful/innovative/noteworthy features.
- Use reduce with Object destructuring and computed property names.
- Previous experience led the app to be modular to achieve scalability and performance while being less error prone.
- 
- State its goals/what problem(s) it solves.
- The scraper allows you to input a specific Reddit comment thread URL to analyse then choose between 4 scrape options.
- You can choose between requesting a JSON directly from Reddit or an archived version of the comment thread from Pushshift.
- The list method will grab each comment and its metadata along with any subsequent child response, then flattening all threads found.
- The sort method that will only grab each comment's author: comment and then sort the results by author.
- 
- Note and briefly describe any key concepts (technical, philosophical, or both) important to the user’s understanding.
- Using either of the Reddit scrape methods will not yield a complete set of comments due to Reddit not serving more then 1500(not positive of actual number) - Pushshift's methods will serve a complete dataset, but all of comments' scores will generally be incorrect. This is due to how Pushshift grabs comments for archival.
- 
- Link to any supplementary blog posts or project main pages.
- Link to Pushshift documentation.
- 
- Note its development status.
- This project is still in development, but currently taking a backseat to another project.I have several other features I would like to build that would track and analyse disinformation campaigns.

- Include badges.
- If possible, include screenshots and demo videos.


### Getting Started


### More Specific Topics (+ sample sub-categories)
- Versioning: Services, APIs, Systems
- Common Error Messages/related details
- Tests

### TODO
- Next steps
- Features planned
- Known bugs (shortlist)

#### <3 taco-tues-on-a-fri

### Methodology, approaches, and problems encountered building V.1.0
In version 1, I used all the elements learned from the MDN Local Library tutorial using mainly ES5 syntax.  I was aware there were more modern and elegant approaches to take, but I felt learning the old syntax first would allow me to experience the fallbacks first hand. 

I found a code snippet on Github for a Reddit comment scraper that used generators to grab comments and replies.  I manually typed this snippet countless times, trying to dissect and understand what each part was doing. I built an Express app around my variation of this code, adding new functions and ideas as I went.  I studied the various SQL and NoSQL database options for schemas that would handle the data I was collecting. I decided to go with MongoDB, which I now believe to be an error. *need to add explanation of why* 

I had my main scraping function housed within a single controller module, continually adding countless layers of complexity to one function.  When making a small change, it would be a rippling shockwave of errors, this was when I learned the error of having all the business logic stuffed within a single controller and how unwieldy and error-prone long functions can be when trying to make small changes.

Due to my decision to structure the app based on MDN’s tutorial, I focused on learning asynchronous functions using the ‘async’ module instead of promises, and in doing so, I learned firsthand what callback hell was like.

I learned the imperfections of the data structure that Reddit hands back to you, giving you an incomplete data set on a comment section that has over 1.5k comments, requiring a function that grabs data from within comments to then make several subsequent calls to retrieve page-inated chunks to get the full comment section.  Because of this limitation, and the need to grab a full set of comments from posts that had 6k+ comments, I found PushShift, a project that archives Reddit and uses Elasticsearch for queries.

I made a variation of my initial code base that asynchronously requested the same data from both Reddit, through parallel requests to each of Reddit’s sort methods, and one call for Pushshift’s complete snapshot.

With my end goal of utilizing NLP/ML processes to analyse sentiment, Pushshift’s response proved to be more valuable, only sacrificing ‘comment score’ upon first acquisition of the data.  If comment score was needed at a later time, it could easily be obtained by making another call to Reddit’s API using the comment identifier returned within Pushshift’s response. 

Once I had the data being returned in a structure I felt was usable and maintainable long term, I began to delve into NLP/ML concepts.  I spent countless hours ingesting recorded college lectures on the concepts and methodologies of NLP.  

I began attempting to clean the data I was taking in from the scrapes.  I originally went with combining the entirety of a comment scrape, and tokenizing the whole thing into one massive pile.  While this approach gave me some insights as to the overall tone potentially present within any given comment thread, I was letting in a considerable amount of noise.   From here I wanted to group the tokenization of these scrapes by user in order to filter out noise by omitting known trolls from  the known/valuable/trustworthy/noteworthy community members.  

I spent several days just learning how to even ask this question, because I was still largely only familiar with ES5 at this point. 
Then I found the idea of using Object destructuring along with reduce() on computed property names. This new concept clicked for me when I found this blog. 

After I had the data sorted by `[user]:comment` key/values, I revisited tokenizing the data for analysis. I used a Python NLP lecture as my guide for cleaning data in NLP processes.  I created my own RegEx filters by reverse engineering the Python examples into JS syntax. This filter worked when all the comments were lumped into the giant pile, but when I tried using this filter on the reduced `[user]:comment` response, I was met by constant errors, ranging from Type Errors and ..is not a function. 

This was the first massive and momentum crippling hurdle I experienced on my path to becoming a developer.  I spent two months grappling with this issue.  At the time, I did not realize my problems arose from my incomplete understanding of the Global Object and Prototypes.  This was also compounded by not knowing that when converting the RegEx expression literal to a string, you need to escape all backslashes as backslashes are consumed when evaluating a string literal.

## Scraper Intermission:  
After grappling with the hurdles of not knowing what I didn’t know, I left for a 2 month trip across the Pacific to end up at DevCon5 in Japan.  

I used this time to take a break from the problem I couldn’t solve, and spent my daily coding time on CodeWars problems everyday. 

I used my daily coding time to solve problems that would help solidify my grasp of JS fundamentals now that I have worked on my own project and had a wider perspective of the problems I've faced, solved and boggled by. I focused much of these learning sessions on objects and data structures. 


While researching a solution to one of these problems, I kept seeing references to using prototypes in the approach. I had seen this word everywhere during my path to learning JavaScript, but I never really sorted out what it was.  That day I changed that, and in doing so I had a breakthrough in my fundamental understanding of the structure of JavaScript.  

I followed along with a lecture on prototypes, typing out all the examples when it finally clicked. Not only did prototypes make sense, but how they relate to the Global object, the `new` keyword and how the recent addition of classes tied into all of this.


### Revisiting the Scraper with V.2.0:  
With my new found grasp of the language, and the lessons learned from hardships and failures while creating V.10, I decided to rebuild the scraper from the ground up, using no tutorials guiding the way.  There were several things I wanted to approach completely different.  

## Escape from callback hell. 
I dove into async-await & promises. Learning about error catching pitfalls in asynchronous functions. Handling variable instantiation and handing it a value from the resolution of a promise.

## Get rid of bloat.
- I searched out unnecessary or outdated modules or practices of using Express that was taught to me by MDN’s tutorial.
- I learned about each part of the generated Express app upon creation, What was necessary, what was outdated?
 Learned several outdated (list these) modules Express was using.
 Realizing I needed a better error handling solution.
 I went with Winston, because it seemed like it was the most popular.  I am now under the impression that I might have been better off using a more basic hand made error handler. I ran into several issues that arose from Winston upgrading to V.3(?) that had caused many developers issues.  I also think I might not have spent enough time exploring the features Winston gives me and how to hand local errors to it.
Aim to incorporate more ES6+ syntax and functionality.
 In using async-await, I explored the various ways to use arrow functions in my then() statements.
 Utilize more destructured Objects.
Understand when to use `let` vs `const` vs `var`
Use industry best practices in app structure and file tree to make the app scalable and less error prone.
Make the app fundamentally more modular, which in turn solves scalability and error proneness.
 When creating functions, making sure not to repeat code by making them general purpose and placing them into a helper module that can be used throughout my app.