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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('url defined and not empty', function() {
			//loops through the allFeeds array and makes sure the url field is defined and has a value
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe(0);
			});
		});
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('name not empty', function() {
			//loops through the allFeeds array and makes sure the name field is defined and has a value
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe(0);
			}); 
		 });
    });

    /* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		//Get the .slide-menu element and finds the offset
		var divMenu = $('.slide-menu');
		var offset = divMenu.offset();
		it('should be hidden by default',function() {
			//finds the left offset and test that it is less than zero
			expect(offset.left).toBeLessThan(0);
		});
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		//Used http://www.htmlgoodies.com/beyond/javascript/js-ref/testing-dom-events-using-jquery-and-jasmine-2.0.html
		it('should be visible when menu icon clicked', function(done) {
			menuIcon.trigger("click");
			var divMenuSecond = $('.slide-menu');
			var offsetSecond = divMenu.offset();
			console.log(offsetSecond.left);
			expect(offsetSecond.left).toBeGreaterThan(-1);
			menuIcon.trigger("click");
			var divMenuThird = $('.slide-menu');
			var offsetThird = divMenu.offset();
			console.log(offsetThird.left);
			expect(offsetThird.left).toBeLessThan(0);
		});
		
    });
    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		//Put done function into loadFeed function
		 beforeEach(function(done) {
			loadFeed(0,function() {
				done();
			});
		 });
		 //makes sure that there is an .entry in .feeder
		 it('.feeder container has at least single .entry element', function(done) {
			expect($('.entry').length).not.toBe(0)
			done();
		 });
	});
    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		//Put done function into loadFeed function to handle asynchronous calls
		beforeEach(function(done) {
			loadFeed(0,function() {
				done();
			});
		});
		//make sure that .header-title changed and that .entry html is not empty
		it('content actually changes', function(done) {
			var innerText = $('.header-title').html();
			expect(innerText).not.toBe('Feeds')
			expect($('.entry').html().length).not.toBe(0) 
			done();
		});
	});
}());
