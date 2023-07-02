# DabaoBuddy

[Project Report](https://docs.google.com/document/d/1WjLjibuKGXjxCush8KQdU4hFuITYwkyn4F8nJAH5U2g/edit)

[Project Log](https://docs.google.com/spreadsheets/d/1v6nRypsq30viSB18fagijehkkoAgrSnH8kn1lzVSbrM/edit#gid=0)

Level of Achievement: Apollo 11

Project Scope:
Establish a  takeaway system that mutually benefits time-pressed NUS students who require quick meals and NUS students who aim for greater financial independence.

Problem Motivation:
As undergraduates mature and become more independent, they seek ways to finance their expenses. This desire for financial independence can stem from a need to gain valuable life skills, reach personal goals, or simply take control of their lives especially. Ultimately, funding their own expenses empowers undergraduates to pursue their aspirations without being dependent on others as they enter a new phase of their lives.

Furthermore, some students may struggle to find the time to eat, let alone wait in line for food, as they hurry from one tutorial or lecture to another. As a result, students skipping their meals has become an unfortunate phenomenon.

Therefore, we are motivated to find a solution that meets the needs of both parties - the time-pressed students who need to eat quickly and the student helpers who seek to be more financially independent, as this is a common issue faced by students in NUS.

Aim:
We are trying to come up with a solution that will accomplish two goals at once. Students who are short on time should have a platform to order food and have it affordably delivered to them by their peers. Given the large student population, we can leverage this by allowing student helpers to deliver meals from their current dining location to their next destination, since it would be convenient for them.

With that, our solution seeks to bridge the gap in the needs of both parties aforementioned.

User Stories:
1. As a student who has to rush between classes, I want to be able to get my meals without wasting time queuing for food, especially during peak periods.

2. As a student helper who is already queuing for food for myself, I would not mind buying an extra portion or two if I can earn some cash in the process.

3. As a student who has to rush between classes, I want to be able to make an informed decision about which stall I should order my food from. Hence a system that optimises decision making (based on individual food preferences, real-time data on waiting times etc) would be beneficial.

4. As a stall owner, I want to diversify my income stream, increasing my total revenue by being able to accommodate both in-real-life, pick-up and delivery orders. 


Proposed core features:

As two separate groups of users are using the app, a user will be in either “Dabao” or “Buddy” mode. Users in “Dabao” mode are users who can place food orders. Users in “Buddy” mode are users who can accept food orders and deliver them to the “Dabao” user who placed that particular order.

The first screen users view after clicking the app icon is known as a splash screen. This screen, which will consist of our app logo, will disappear once when the app is ready to launch. 

After the splash screen, the app will navigate users to the login screen, where they are prompted to enter username and password. If the user is unregistered, a TouchableOpacity element within the login page can be pressed to navigate him to the registration screen. After the user clicks “register now”, he will be navigated to the login page once again. Once a user enters the correct username and password, upon clicking “Login”, he will be navigated to the home screen.

When a user enters the home page, a bottom tap navigator will be visible. This navigator allows the user to seamlessly toggle between Home, Finances, Orders, Messenger and Profile screens.

The finances screen allows the user to track their earnings (money earned when they were in “Buddy” mode) and their expenditure (money spent when they were in “Dabao” mode”).

The orders screen allows the user to track the status of a user’s placed orders. The status can be Pending, Accepted, Delivering or Delivered.

The messenger screen allows the user to communicate with the user at the other end of an accepted order. For example, if a user is in “Buddy” mode, he will be able to message the other “Dabao” user who placed the order. Conversely, if a user is in “Dabao” mode, he will be able to message the other “Buddy” user who is helping to takeaway and deliver the order.

The profile screen allows the user to view and edit his personal particulars.

The home screen is the most important screen in this app. When a user is first navigated to the home screen, after logging in, he will see two buttons. The buttons will read “Dabao” and “Buddy”. The user will be placed in the “Dabao” mode if he presses on the “Dabao” button and vice versa. Depending on the mode that a user is presently in, the home screen will change its display accordingly. On the bottom right hand corner of the home screen, there will be a button that allows the user to change the mode that he is in. 

The home screen - “Dabao” mode version: Pick canteen > Pick Food > Place/Confirm order

The home screen - “Buddy” mode version: Pick delivery location > Pick canteen > View available orders > Accept order



Testing Instructions:
1. Create a folder 
2. Open a source-code editor (e.g Visual Code Studio)
3. Open terminal on text editor
4. Change working directory to folder created in step 1
5. Type in terminal: `git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git`
   a. In the case that you are faced with this error message: “The “git” command requires the command line developer tools”, type         into terminal: `xcodebuild - runFirstLaunch`
   b. Wait for installation to be complete
   c. Type in terminal: `git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git`
6. Type in terminal: `cd DabaoBuddy`
7. To view all the files, type in terminal: `code .`
8. Type in terminal: `npm install`
   a. In the case that you are faced with this error message: “zsh: command not found: npm”, you need to install Node.js before           proceeding.
   b. Visit the official Node.js website: https://nodejs.org  and install LTS version
   c. Download the appropriate installer for your operating system. Run the installer and follow the instructions to complete the         installation.
   d. After installation is complete, Type in terminal: `npm install`
8. Wait for installation to be complete
9. Type in terminal: `npm start`
10. Step 9 will cause a QR code to be generated inside the terminal
11. Download “Expo Go” app on your personal mobile device
12. Scan the QR code (Ensure that wifi connected on both computer and mobile device are the same)
13. Open “Expo Go” app to try out our application

<details>
  <summary><strong>Testing Instructions </strong></summary>
  <p>
     1. Create a folder 
     2. Open a source-code editor (e.g Visual Code Studio)
     3. Open terminal on text editor
4. Change working directory to folder created in step 1
5. Type in terminal: `git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git`
   a. In the case that you are faced with this error message: “The “git” command requires the command line developer tools”, type         into terminal: `xcodebuild - runFirstLaunch`
   b. Wait for installation to be complete
   c. Type in terminal: `git clone https://github.com/elizabethrakhibaby/DabaoBuddy.git`
6. Type in terminal: `cd DabaoBuddy`
7. To view all the files, type in terminal: `code .`
8. Type in terminal: `npm install`
   a. In the case that you are faced with this error message: “zsh: command not found: npm”, you need to install Node.js before           proceeding.
   b. Visit the official Node.js website: https://nodejs.org  and install LTS version
   c. Download the appropriate installer for your operating system. Run the installer and follow the instructions to complete the         installation.
   d. After installation is complete, Type in terminal: `npm install`
8. Wait for installation to be complete
9. Type in terminal: `npm start`
10. Step 9 will cause a QR code to be generated inside the terminal
11. Download “Expo Go” app on your personal mobile device
12. Scan the QR code (Ensure that wifi connected on both computer and mobile device are the same)
13. Open “Expo Go” app to try out our application

  </p>
</details>
