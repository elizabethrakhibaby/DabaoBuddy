# DabaoBuddy

[Project Poster](https://drive.google.com/file/d/1RI9s0aSEmzOZDy1GF3sfXYO1nZkH6nYa/view)

[Project Video](https://drive.google.com/file/d/1ppKNNM8FqufivP9MfUZqDR3-ZQsmsyn9/view)

[Project Report](https://docs.google.com/document/d/132meZLwkp9i0_rPOYy8ekMwSC7W39CLt5qaOEGl8-UQ/edit)

[Project Log](https://docs.google.com/spreadsheets/d/1v6nRypsq30viSB18fagijehkkoAgrSnH8kn1lzVSbrM/edit#gid=0)
<hr>

<h3>Level of Achievement: </h3> Apollo 11

<h3>Project Scope: </h3>

Establish a takeaway system that mutually benefits time-pressed NUS students who require quick meals and NUS students who aim for greater financial independence.
<details>
  <summary>Problem Motivation</summary>
  <p>
    
  As undergraduates mature and become more independent, they seek ways to finance their expenses. This desire for financial independence can stem from a need to gain valuable life skills, reach personal goals, or simply take control of their lives especially. Ultimately, funding their own expenses empowers undergraduates to pursue their aspirations without being dependent on others as they enter a new phase of their lives.

Furthermore, some students may struggle to find the time to eat, let alone wait in line for food, as they hurry from one tutorial or lecture to another. As a result, students skipping their meals has become an unfortunate phenomenon.

Therefore, we are motivated to find a solution that meets the needs of both parties - the time-pressed students who need to eat quickly and the student helpers who seek to be more financially independent, as this is a common issue faced by students in NUS.

Aim:
We are trying to come up with a solution that will accomplish two goals at once. Students who are short on time should have a platform to order food and have it affordably delivered to them by their peers. Given the large student population, we can leverage this by allowing student helpers to deliver meals from their current dining location to their next destination, since it would be convenient for them.

With that, our solution seeks to bridge the gap in the needs of both parties aforementioned.
    
  </p>
</details>
<details>
  
  <summary>User Stories</summary>
  
  <ol>
    <br>
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

# Overview of Features

## Startup Landing Page
Splash screen with Dabao Buddy logo

## Authentication Pages
### Login Page
Our app utilises Firebase Authentication SDK for email and password verification. If the provided email is a valid NUS email, the user is redirected to the Home Page; otherwise, an error message is displayed. Passwords are case-sensitive, ensuring secure authentication.

Pop-up Notification

### Signup Page
- Email: Only NUS Students are able to sign up as there is a check to ensure that only NUS emails can be used for registration. Eg. JohnDoe@u.nus.edu. Otherwise, an error message is displayed.
- Password & Confirm Password: Caps sensitive, both input must be equivalent. Otherwise, an error message is displayed.

Pop-up Notification

## Home Page (Dabao)
Purpose: Search and place an order for food.

- Default home page shows a list of available restaurants, based on the default search keyword of "pasta."
- There is a search function, enabling users to input keywords and filter restaurant results based on their preferences. Clicking on a specific restaurant reveals the available menu items of that restaurant to the user.

## Buddy Page
Purpose: View available orders and accept order (dabao).

Upon clicking on "Accept Order," the Buddy Page is re-rendered, causing that order to disappear from view.

## Finance Page
Track earnings and expenditure.

Financial data will be reflected on the dynamic donut pie chart and accompanying two boxes that reflect specific numerical values.

## Orders Page
View order history.

- List of orders placed.
- List of orders accepted.
- Feature to mark an order as done
- Pop-up Notification when user marks an order as done

## Messaging Page
Communicate live with the user at the other end of a placed/accepted order.

- Click on a specific order within Orders page to be brought to Messaging Page.
- Hence, messaging page is accessed via/navigated from Orders Page.
- Timestamp and user name tagged to every message.

## Profile Page
- Displays email used to register.
- Displays preferred name to be addressed by.


Disclaimer: For the purposes of testing app features, instead of NUS food menu items, tagged menu items of restaurants are shown instead. This data is obtained through the integration of Yelp API in DabaoBuddy. 







