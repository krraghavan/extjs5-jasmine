# extjs5-jasmine


# IMPORTANT NOTE ON SENCHA
TO USE THIS CODE YOU NEED A VERSION OF EXTJS5 in the SC15 directory.  SINCE EXTJS COMES WITH ITS OWN COMMERCIAL
LICENSE IT IS NOT INCLUDDE IN THIS DISTRIBUTION.  YOU WILL NEED TO GET YOUR OWN COPY OF EXTJS BEFORE YOU CAN USE
THIS WORK.

THIS WORK ALSO INCLUDES THE JASMINE 2.x LIBRARY AND THE TERMS OF THAT LICENSE APPLIES TO THE USE OF THIS WORK.

# Jasmine UNIT TESTS WITH ExtJS5

To use this workspace you need to

1. Get a legal copy of Sencha ExtJS5.x (this package was build with 5.1.0.26) and put it in the ext folder under SC15.
2. sencha app build on the KRR and KRRUnitTest applications
3. sencha app watch in one of the app directories
4. Launch your browser and navigate to http://localhost:1841/KRRUnitTest/index.html?suite=nightly.

# DESIGN NOTES:

This project uses a modified version of the bootstrap.js file to include the Jasmine test suites that are specified
by the suite query parameter in the URL.  For example, if suite=nightly, the bootstrap.json file expects to find
a file called nightly.json under the suites folder.  This file specifies the specs that are part of the specified
test suite.  To create additional suites you can create any number of files in this folder.

# ABOUT THIS EXAMPLE

A simple login page is used as an example to demonstrate the use of Jasmine Unit tests.  If you navigate to
http://localhost:1841/KRR/index.html you will see the login page which shows the user name, password and login button.
The login page uses a simple validation scheme that shows the login button being disabled when both user name
and password are blank.

The login page uses an API function (not implemented) to perform the login.  It is assumed that this function will call
the server to perform the actual login.  In order to make this unit test not have server dependencies, the unit test
injects its own version of this function.  The overridden login API function simulates various server responses and
uses the following logic:

Two random usernames are used in the tests - one username that is valid and the other that does not have the authorization to
use the application (to simulate an Access denied scenario).

* If the username is valid and the password is same as the user name - it simulates a valid login.
* If the username is valid and the password is different from the user name - it simulates an invalid username or password response.
* If the invalid username is used, it simulates an access denied error from the server.

# UNIT TESTS
7 unit tests are specified for this page

1. Login button should be disabled when username and password is empty
2. Login button should be disabled when username is not empty and password is empty
3. Login button should be disabled when username is empty and password is not empty
4. Login button should be enabled when username or password is not empty
5. Must return an error when the authentication fails
6. Must return an error when access is denied
7. Must not have an error when the authentication succeeds

# JASMINE 2.x TIPS

3. The panel is created in the beforeEach method but rendered in each test.  This is because we want to test the various widget
states after they are rendered.  An afterrender listener is registered before rendering.  The done() method is executed
inside the afterrender listener.  This will ensure that the test doesn't exit when testing with components that may
take longer to render.
4. The beforeAll method is used to include all the classes/code dependencies that are needed by the unit test.  They are
loaded synchronously so ensure that the classes are available before test execution begins.
1. In order for the two way binding handlers to perform the updates, setTimeout is used after setting field values before
testing for button or bound value states
2. Use the jasmine done() function to make sure that tests don't exit prematurely.
