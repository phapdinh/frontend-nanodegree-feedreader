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
        it('are defined', function() {
			//makes sure that allFeeds array is defined and is not empty
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
        });
		it('url defined and not empty', function() {
			//loops through the allFeeds array and makes sure the url field is defined and has a value
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});
		});
		it('name not empty and is defined', function() {
			//loops through the allFeeds array and makes sure the name field is defined and has a value
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			}); 
		});
    });
	describe('The menu', function() {
		//Get the .slide-menu element and finds the offset
		var divMenu = $('.slide-menu');
		var offset = divMenu.offset();
		it('should be hidden by default',function() {
			//finds the left offset and test that it is less than zero
			expect(offset.left).toBeLessThan(0);
		});
		//Used http://www.htmlgoodies.com/beyond/javascript/js-ref/testing-dom-events-using-jquery-and-jasmine-2.0.html
		//Used https://github.com/bcuz/feedreader/blob/master/jasmine/spec/feedreader.js from discussion forum
		it('should be visible when menu icon clicked', function() {
			//removes menu-hidden class from body element
			$('.menu-icon-link').trigger('click');
			//if element is removed then hasClass should return false
			expect($("body").hasClass("menu-hidden")).toBe(false);
			//adds menu-hidden class to body element
			$('.menu-icon-link').trigger('click');
			//if element is removed then hasClass should return true
			expect($("body").hasClass("menu-hidden")).toBe(true);
		});
		
    });
	describe('Initial Entries', function() {
		//Put done function into loadFeed function
		beforeEach(function(done) {
			loadFeed(0,done);
		});
		 //makes sure that there is an .entry in .feed
		it('.feed container has at least single .entry element', function() {
			expect($('.entry').length).not.toBe(0);
		});
	});
	//Used https://discussions.udacity.com/t/last-test-in-feed-reader-project/35165/5 from discussion forum
	describe('New Feed Selection:', function() {
		var previousFeedTitle, newFeedTitle,
		previousFeedLink, newFeedLink,
		previousContent, newContent;

		var contentAlwaysChanges = true;
		
		beforeEach(function(done) {
			loadFeed(0, function() {
				// This should resolve to a string containing the entire html content
				// of the feed section:
				newContent = $('.feed').html();

				// Should resolve to something like "Udacity Blog":
				newFeedTitle = $('.header-title').text();

				// Should resolve to something like "http://blog.udacity.com/abcdefg":
				newFeedLink = $('.feed .entry-link')[0].href;

				previousContent = true;
				
				done();
			});
		});
		
		beforeEach(function(done) {
			loadFeed(1, function() {
				if(previousContent) {
					//if previous content is defined then loads previous content, feedtitle, and feedlink with previous content, feedtitle, and feedlink
					previousContent = newContent;
					previousFeedTitle = newFeedTitle;
					previousFeedLink = newFeedLink;
					//retrieves new content from DOM
					newContent = $('.feed').html();
					newFeedTitle = $('.header-title').text();
					newFeedLink = $('.feed .entry-link')[0].href;
					//Compares the previous content with new content and if any content hasn't change then contentAlwaysChanges equals false
					if (previousContent === newContent ||
						previousFeedTitle === newFeedTitle ||
						previousFeedLink === newFeedLink) {
						contentAlwaysChanges = false;
					}
				}
				done();
			});
		});
		
		it('produces new entries when a new feed is loaded', function(done) {
			//If contentAlwaysChanges is equal to true then test passes
			expect(contentAlwaysChanges).toBe(true);
			done();
		});
		
		//after test loads the feed with first id
		afterAll(function() {
			loadFeed(0);
		});
	});
}());
