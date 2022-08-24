# Similaritisum 

### Task based on Node.js and React.

*Your task is to implement streaming service of lorem ipsum words that will inspect similarity
between texts, for instance, the ratio of bacon references to pirate references (aka, words
with more than two r’s) or make skewers (map words to skewer format where you get
something similar to shish-kebab = jalapeno == ---{[]S[]([]o[]-- ) from words and see who
has greater skewer average.
For every n words from a set of streams, compare them in a free form way (it’s up to you
to decide on the similarity algorithm).*

It consists of 5 folders which contain frontend code built in **React** with **MUI** components and **React Context** as state management.

Services folder which contains some reusable js classes for file handling and **Similarity Alghorithms**.

Server folder which leverages **Express** for routing and communication between storage and frontend. I used files here but it shouldn't be a problem to switch to a database especially if it is **noSQL** database.

And data folder which containes two test texts and behaves as a storage for saving files.

So let s first 
## Install 

After cloning this repo and `cd`-ing in it(moving in it that is) first thing to do would be to do  
    
    npm run i

same with the frontend or view folder 

    cd view && npm run i

after we get all the necessary packages we could procede with starting are server and react application. Before starting with web application we could check out cli app with

    node cli/indexCLI.js ./data/test ./data/test1


Okey, had fun with cli? Let's try using the web. So ideally it would be under package.json scripts but we would need to go long way here so our next step is 

    node ./server/index 

Which runs our express application after which we can go for 

    cd ./view && npm run start

## Under the hood

Under the hood,operative part that is alghorithm are **JaroWrinker** for text comparison, **LevenshteinDistance** for counting the amount of changes and **hashMapCounting** for word ratio.

JaroWrinker and hashMapCounting are implemented inside of React Application while LevenshteinDistance is not.

---

## UPDATED, REFACTORED BRANCH 
# **updateWithNotes**

So based on your suggestions I refactored and implemented some of your propositions into this task. NodeCLI application now has a switch implemented that corresponds to diffrent actions that user wants to try out. Server has proper express routing setup and error handling. ReadFile has been moved to FileHandler file but not class. There is more refactoring to be done there with possibility of creating my own npm package for file handling use. Edge casses in all parts of the application as well as the try...catch blocks have been written in, also React application now utilizes .env file for setting up the communication with node.js which is not in the current repository as well as instantiating AXIOS with the same variable 

    REACT_APP_NODE_API=http://localhost:8080 
    
which improves readabilty and gives some options as call timeout and error response.

Alghorithms weren't touched at all...

Looking forward to hearing from you...



