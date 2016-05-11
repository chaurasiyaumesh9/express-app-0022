// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

		app.post('/api/nerds', function(req, res) {
			
           if ( !req.body.nerdData )
			{
				return;
			}

			var nerd = req.body.nerdData ;	
			var NewNerd = new Nerd( nerd );
			
			NewNerd.save(function(err, newNerd ) {
				 if (err)
                    res.send(err);
				
				res.json( newNerd );
				
			});
        });

		app.delete('/api/nerds/:id', function(req, res) {
			console.log('req.params.id :',req.params.id);
           if ( !req.params.id )
			{
				return;
			}
			Nerd.findByIdAndRemove( req.params.id, function(err) {
				 if (err)
				res.send(err);
			
				res.json( {} );
			});		
        });

		

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
