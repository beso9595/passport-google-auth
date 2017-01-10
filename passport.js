var authConfig = require("./auth");
var User = require("./user");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done){
        User.findById(userId, function(err, user){
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
            clientID: authConfig.clientID,
            clientSecret: authConfig.clientSecret,
            callbackURL: authConfig.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err){
                        return done(err);
                    }
                    if(user){
                        return done(null, user);
                    }
                    else {
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;
                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

};