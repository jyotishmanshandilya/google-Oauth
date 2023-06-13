const express = require('express');
const session = require('express-session');
require('./auth')
const passport = require('passport');
const PORT  = process.env.PORT || 5000;

//middleware
function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

const app = express();
//commit secret to environment variable
app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.send('<a href=/auth/google>SignIn with Google</a>');
})

app.get('/auth/google',
 passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
)

app.get('/auth/failure', (req, res)=>{
    res.send("Authentication failed!!")
})

app.get('/protected', isLoggedIn, (req, res)=>{
    res.send(`hello ${req.user.displayName} you're signed in`);
})

app.get('/login', (req, res)=>{
    res.send('login');
})

app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.send('Goodbye');
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})