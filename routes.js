

module.exports = function(app, passport){

    app.get("/", function(req, res){
        res.render("index");
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get("/profile", isLogged, function(req, res){
        res.render("profile", { user: req.user });
    });

    app.get("/logout", isLogged, function(req, res){
        req.logout();
        res.redirect("/");
    });

};

function isLogged(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}