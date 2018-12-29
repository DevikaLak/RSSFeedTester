/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('all feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('all feeds\' valid url defined', function() {
           //loop to iterate over each feed
           for (let feed of allFeeds) {
             //test to ensure URL defined
             expect(feed.url).toBeDefined();

             //test to ensure URL is not empty
             expect(feed.url.length).not.toBe(0);
           }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all feeds\' valid name defined', function() {
           //loop to iterate over each feed
           for (let feed of allFeeds) {
             //test to ensure name defined
             expect(feed.name).toBeDefined();

             //test to ensure name is not empty
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* Creating a new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu default state validated', function() {
           let bodyElem = document.querySelector('body');
           expect(bodyElem).toBeDefined();

           expect(bodyElem.className).toEqual('menu-hidden');
           expect(bodyElem.className.length).not.toBe(0);
         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('menu states on click validated', function() {
            let bodyElem = document.querySelector('body');
            let menuLinkElem = document.querySelector('.menu-icon-link');

            expect(bodyElem).toBeDefined();
            expect(menuLinkElem).toBeDefined();

            //on first click
            menuLinkElem.click();
            expect(bodyElem.className.length).toBe(0);
            //on second click
            menuLinkElem.click();
            expect(bodyElem.className).toEqual('menu-hidden');
          });
    });

    /* Creating a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         /* Logic:
          * For performing the test, the feeds for each link is loaded by
          * invoking the loadFeed method and it is ensured that for each newly
          * loaded feed there exists at least one anchor link containing a feed
         */

         //iterating over each feed to ensure that criteria is met for all feed links
         for (let i = 0; i < allFeeds.length; i++) {
             let feedContainer, allFeedAnchors;

             //executing loadFeed asynchronously in beforeEach
             beforeEach(function(done) {
               loadFeed(i, function() {
                 feedContainer = document.querySelector('.feed');
                 if (feedContainer !== undefined) {
                   allFeedAnchors = feedContainer.querySelectorAll('a');
                 }
                 done();
               });
             });

             it(`should grab atleast one feed for ${allFeeds[i].name}`, function() {
               /* ensuring there is atleast one anchor link for each newly
                * loaded feed
               */
               expect(allFeedAnchors).toBeDefined();
               expect(allFeedAnchors.length).toBeGreaterThan(0);
             });
         }
    });

    /* Creating a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         /* Logic:
          * Setting previous top link to empty. Then invoking load feed for
          * first link and ensuring that the top link value for this link
          * isn't the same as previous link. Then, setting this value and
          * previous and continuing the test for other links in similar
          * fashion
          */
         let feedContainer, allFeedAnchors, previousTopFeedLink, currTopFeedLink;
         beforeAll(function() {
           console.log("Perfect???");
           //initializing previous top feed to empty value for once
           previousTopFeedLink = '';
         });
         //iterating over each fee link
         for (let j = 0; j < allFeeds.length; j++) {
           it(`content for ${allFeeds[j].name} has changed`, function(done) {
             //executing loadFeed asynchronously
             loadFeed(j, function() {
               /* In callback function of load feed fetching the first anchor
                * link from feed container of document loaded
               */
               feedContainer = document.querySelector('.feed');
               if (feedContainer !== undefined) {
                 allFeedAnchors = feedContainer.querySelectorAll('a');
                 if (allFeedAnchors !== undefined && allFeedAnchors.length > 0) {
                   currTopFeedLink = allFeedAnchors[0].href;
                 }
               }
               // ensuring this link is not same as previously saved top feed
               expect(currTopFeedLink).toBeDefined();
               expect(currTopFeedLink).not.toEqual(previousTopFeedLink);
               /* updating the previously saved top feed with current value
                * for future iterations
                */
               previousTopFeedLink = currTopFeedLink;
               done();
             });
           });
         }
    });
}());
