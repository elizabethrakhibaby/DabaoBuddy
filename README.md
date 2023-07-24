# DabaoBuddy

[Project Poster](https://drive.google.com/file/d/1RI9s0aSEmzOZDy1GF3sfXYO1nZkH6nYa/view)

[Project Video](https://drive.google.com/file/d/1ppKNNM8FqufivP9MfUZqDR3-ZQsmsyn9/view)

[Project Report](https://docs.google.com/document/d/132meZLwkp9i0_rPOYy8ekMwSC7W39CLt5qaOEGl8-UQ/edit)

[Project Log](https://docs.google.com/spreadsheets/d/1v6nRypsq30viSB18fagijehkkoAgrSnH8kn1lzVSbrM/edit#gid=0)

<details>
  <summary>Testing Instructions</summary>
  <ol>
    <li>Create a folder.</li>
    <li>Open a source-code editor (e.g., Visual Studio Code).</li>
    <li>Open the terminal in the text editor.</li>
    <li>Change the working directory to the folder created in step 1.</li>
    <li>
      Type the following command in the terminal:
      <code>git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git</code>
      <ol type="a">
        <li>
          If you encounter the error message "The 'git' command requires the command line developer tools," type the following command in the terminal:
          <code>xcodebuild -runFirstLaunch</code>
        </li>
        <li>Wait for the installation to complete.</li>
        <li>Type the following command in the terminal:
          <code>git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git</code>
        </li>
      </ol>
    </li>
    <li>Type the following command in the terminal: <code>cd DabaoBuddy</code>.</li>
    <li>To view all the files, type the following command in the terminal: <code>code .</code></li>
    <li>
      Type the following command in the terminal: <code>npm install</code>
      <ol type="a">
        <li>
          If you encounter the error message "zsh: command not found: npm," you need to install Node.js before proceeding.
          <ol>
            <li>Visit the official Node.js website (https://nodejs.org) and install the LTS version.</li>
            <li>Download the appropriate installer for your operating system, run the installer, and follow the instructions to complete the installation.</li>
            <li>After the installation is complete, type the following command in the terminal: <code>npm install</code></li>
          </ol>
        </li>
      </ol>
    </li>
    <li>Wait for the installation to complete.</li>
    <li>Type the following command in the terminal: <code>npm start</code>.</li>
    <li>Step 9 will cause a QR code to be generated inside the terminal.</li>
    <li>Download the "Expo Go" app on your personal mobile device.</li>
    <li>
      Scan the QR code (Ensure that Wi-Fi connected on both the computer and mobile device is the same).
    </li>
    <li>Open the "Expo Go" app to try out our application.</li>
  </ol>
</details>
<hr>

Level of Achievement: Apollo 11

Project Scope:
Establish a takeaway system that mutually benefits time-pressed NUS students who require quick meals and NUS students who aim for greater financial independence.

Problem Motivation:
As undergraduates mature and become more independent, they seek ways to finance their expenses. This desire for financial independence can stem from a need to gain valuable life skills, reach personal goals, or simply take control of their lives especially. Ultimately, funding their own expenses empowers undergraduates to pursue their aspirations without being dependent on others as they enter a new phase of their lives.

Furthermore, some students may struggle to find the time to eat, let alone wait in line for food, as they hurry from one tutorial or lecture to another. As a result, students skipping their meals has become an unfortunate phenomenon.

Therefore, we are motivated to find a solution that meets the needs of both parties - the time-pressed students who need to eat quickly and the student helpers who seek to be more financially independent, as this is a common issue faced by students in NUS.

Aim:
We are trying to come up with a solution that will accomplish two goals at once. Students who are short on time should have a platform to order food and have it affordably delivered to them by their peers. Given the large student population, we can leverage this by allowing student helpers to deliver meals from their current dining location to their next destination, since it would be convenient for them.

With that, our solution seeks to bridge the gap in the needs of both parties aforementioned.

<details>
  <summary>User Stories</summary>
  <ol>
    <li>As a student who has to rush between classes, I want to be able to get my meals without wasting time queuing for food, especially during peak periods. I do not mind paying a small fee to get it delivered at my convenience.</li>
    <br>
    <li>As a student helper who is already queuing for food for myself, I would not mind buying an extra portion or two if I can earn some cash in the process. I have unfortunately found myself fitting into the stereotype of “broke uni kid”.</li>
     <br>
    <li>As a student who has to rush between classes, I want to be able to make an informed decision about which stall I should order my food from. Hence a system that optimises decision making (based on individual food preferences, real-time data on waiting times etc) would be beneficial.</li>   
     <br>
    <li>As a student ordering food, I would like to be given options to choose from campus-wide. </li>   
     <br>
    <li>As a stall owner, I want to diversify my income stream, increasing my total revenue by being able to accommodate both in-real-life, pick-up and delivery orders.</li>   
  </ol>
</details>
<hr>
Proposed core features:

 <ol>
    <li>Startup landing page: Splash screen</li>
    <li>Authentication Page</li>
    <li>Signup</li>
    <ol type="a">
       <li>Only NUS Students are able to sign up as only NUS emails are valid upon registration. Eg. JohnDoe@u.nus.edu. Otherwise error occurs. </li>
       <li>Password & Confirm Password: Caps sensitive, both input must be equivalent. Otherwise error occurs. </li>
    </ol>
    <li>Home Page (Dabao)</li>
    <ol type="a">
       <li>Purpose: Order food. </li>
       <li>Default home page with lists of available restaurants. </li>
       <li>Search function to filter specific wants of users. Click on the respective restaurant to be shown the available options.. </li>
    </ol> 
    <li>Buddy Page</li>
    <ol type="a">
       <li>Purpose: Offer to help dabao </li>
       <li>Accept requests </li>
    </ol> 
    <li>Finance Page</li>
    <ol type="a">
       <li>Track earnings and expenditure </li>
       <li>Financial data will be reflected on the dynamic donut pie chart and accompanying two boxes that reflect specific numerical values </li>
    </ol>  
    <li>Orders Page</li>
        <ol type="a">
       <li>View order history </li>
       <li>List of orders placed  </li>
           <li>List of orders accepted  </li>
    </ol>  
     <li>Messenger Page</li>
    <ol type="a">
       <li>Communication between dabao and buddy users. </li>
       <li>Store chat history. </li>
    </ol>  
    <li>Profile Page</li>
    <ol type="a">
       <li>Displays email used to register </li>
       <li>Displays preferred name to be addressed by </li>
       <li>Logout: Redirected to the login page.  </li>
    </ol>  
 </ol>

<hr>
The first screen users view after clicking the app icon is known as a splash screen. This screen, which will consist of our app logo, will disappear once when the app is ready to launch. 

After the splash screen, the app will navigate users to the login screen, where they are prompted to enter username and password. If the user is unregistered, a TouchableOpacity element within the login page can be pressed to navigate him to the registration screen. After the user clicks “SIGN UP”, he will be navigated to the login page once again. Once a user enters the correct username and password, upon clicking “LOGIN”, he will be navigated to the home screen.

When a user enters the home page, a bottom tap navigator will be visible. This navigator allows the user to seamlessly toggle between Home, Finances, Orders, Messenger and Profile screens.

The home screen allows the user to search for their cravings and place an order.

The finances screen allows the user to track their earnings (money earned when they were in “Buddy” mode) and their expenditure (money spent when they were in “Dabao” mode”).

The orders screen allows the user to track the status of a user’s placed orders. The status can be Pending, Accepted, Delivering or Delivered.

The buddy screen allows user to reject/accept pending requests for dabaos.

The messenger screen allows the user to communicate with the user at the other end of an accepted order. For example, if a user is in “Buddy” mode, he will be able to message the other “Dabao” user who placed the order. Conversely, if a user is in “Dabao” mode, he will be able to message the other “Buddy” user who is helping to takeaway and deliver the order.

The profile screen allows the user to view and edit his personal particulars. Users are also able to logout from the profile screen. 

Disclaimer: For the purposes of testing app features, instead of NUS food menu items, tagged menu items of restaurants are shown instead. This data is obtained through the integration of Yelp API in DabaoBuddy. 







