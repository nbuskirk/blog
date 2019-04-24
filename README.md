# React Blog

4/22 Code cleanup and reducers...reduced by half. Alot of un-necessary code. Indents and line breaks / spacing fixed.

# Completed


### App
Application container component. Responsible for looking at localstorage for a stored user and passing it to the subsequent components.
#### Contains: Home, Blog, Login, Signup, Nav, Profile

### Home
Just a home component, displays homepage, and welcome back message if it receives a user.

### Blog
Displays a blog list component. If you are logged in, shows an add post form. 
#### Contains: Post, Post/Form

### Login
A login component. Sends username and pass to backend. If there is a successful login, stores the user in localstorage and redirects to the homepage. Shows error messages if it receives any.
#### Contains: Login/Form

### Signup
A user creation component. Sends user/pass to backend. Updates user list with new user, or shows error messages if it receives any.
#### Contains: Signup/Form

## Nav
A top-level navigation component. Shows router links and conditional login/logout links if there is a user present.

## Profile
A user profile component. Displays user info. If accessed directly without logging in will redirect to home route.
