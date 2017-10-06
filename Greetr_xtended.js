;(function(global, $) {
    
    // Define a local copy of Greetr
    var Greetr = function(firstName, lastName, language) {
        // Pass a function constructor Greetr.init with the required parameters and return it as an object using the new keyword.
        return new Greetr.init(firstName, lastName, language);   
    };
    
    // Set languages that would be supported by the Greetr function
    // This is hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'ig', 'yo', 'ha'];
    
    // Informal greetings
    var greetings = {
        en: 'Hello',
        ig: 'Nnoo',
        yo: 'Pele O',
        ha: 'Sannu'
    };
    
    // Formal greetings
    var formalGreetings = {
        en: 'Greetings',
        ig: 'Ekele',
        yo: 'Ekaabo',
        ha: 'Gaisuwa'
    };
    
    // Logger messages
    var logMessages = {
        en: 'Logged in',
        ig: 'I banye go',
        yo: 'E ti wole',
        ha: 'Yana sanya hannu'
    };
    
    // Object containing methods to be used inside the object returned from Greetr
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        // Check if language parameter passed in match supported languages.
        // Throw new error if language is not supported
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "invalid Language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        // Select preferred greeting (formal or informal).
        // Chainable methods return their own containing object
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }
            
            // log greeting to browser console
            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        // Manually ensure that greeting message is logged
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ' ' + this.fullName());
            }
            
            // Make chainable
            return this;
        },
        
        setLang: function(lang) {
            
            // Set the language
            this.language = lang;
            
            // Validate
            this.validate();
            
            // Make chainable
            return this;
        },
        
        // Accepts a jQuery selector and updates whatever the selector is
        HTMLGreeting: function(selector, formal) {
            
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            // Determine the message
            var msg;
            
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            // Place message in chosen DOM position
            $(selector).html(msg);
            
            // Make chainable
            return this;
            
        },

        time: function(selector) {

            var d = new Date();
            
            // Get hour
            var hour = d.getHours();

            // Get minute
            var minute = d.getMinutes();
            
            // Set time to am or pm
            var amPm = (hour < 12) ? 'am' : 'pm';
            
            // Set time to show in 12 hour format
            if(hour > 12) {

                hour -= 12;

            }
            else if(hour === 0) {

                hour = 12;

            }
            
            // Set minute to show in 2-digit format, starting from 00
            minute = minute < 10 ? '0' + minute : minute;
            
            var msg = hour + ':' + minute + ' ' + amPm;
            
            // Place message in chosen DOM position
            $(selector).html(msg);
            
            // Make chainable
            return this;

        },
        
        greeter: function(selector) {
            
            var d = new Date();
            
            // Get hour
            var hour = d.getHours();
            
            // Set greeting to correspond with time of the day
            var t;
            
            if(hour < 12) {
                
                t = 'Good Morning';
                
            }
            else if(hour >= 12 && hour < 16) {
                
                t = 'Good Afternoon';
                
            }
            else if(hour >= 16) {
                
                t = "Good Evening";
                
            }
            
            // Place greeter in chosen DOM position
            $(selector).html(t);
            
            return this;
        }
        
    }; // Greetr.prototype ends
    
    // Create actual object that allows for attaching function constructor to empty object without adding 'new'.
    Greetr.init = function(firstName, lastName, language) {
        
        // Setup values for the function arguments or a default if nothing is passed
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
        
    };
    
    // Set Greetr.prototype as prototype of objects created with the Greetr.init function
    Greetr.init.prototype = Greetr.prototype;
    
    // Expose the Greetr function by attaching it to the global object so that it can be called using the alias G$
    global.Greetr = global.G$ = Greetr;
    
}(this, jQuery));