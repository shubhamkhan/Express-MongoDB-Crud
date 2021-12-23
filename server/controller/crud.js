const restaurant_model = require('../model/restaurant_model');

// Show data
exports.show = async(req, res) => {
    try {
        const restaurant = await restaurant_model.find();
        if(restaurant){
            res.render('home', { 
                title: 'Welcome ',
                user: req.user.name,
                restaurant: restaurant,
            });
        }
    } catch {
        res.status(500).send({message:'Data is empty !!!'});
    }
}

// Find a single data
exports.finddata = async(req, res) => {
    try {
        var restaurant = [];
        const data = await restaurant_model.findById(req.params.id);

        if(data){
            restaurant.push(data);
            res.render('home', { 
                title: 'Welcome ',
                user: req.user.name,
                restaurant: restaurant
            });
        }
    } catch {
        res.status(500).send({message:'Data finding Error !!!'});
    }
    // await restaurant_model.findById(req.params.id).then(res => {
    //     console.log('data--------',res)
    // }).catch(err => console.log(err))
}

// Insert into database
exports.add = async(req, res) => {

    if(!req.body) {
        res.status(500).send({message:'Data no Inserted !!!'});
    }

    try {
        const exist = await restaurant_model.exists({name: req.body.itemname});
        if(exist) {
            req.flash('error', 'Item Already Exists !!!');
            res.redirect('/dashboard');
        } else {
            const restaurantdata = new restaurant_model({
                name: req.body.itemname,
                address: req.body.address,
                price: req.body.price,
                time: req.body.time,
                rating: req.body.rating
            });
            const a1 = await restaurantdata.save()
            if(a1) {
                req.flash('success', 'Item Added !!!');
                res.redirect('/dashboard');
            }
        }
    } catch(err) {
        res.status(500).send({message:'Data inserted Error !!!'});
    }
}

// Delete a single data
exports.delete = async(req, res) => {

    try {
        const alien = await restaurant_model.deleteOne({_id: req.params.id})
        if(alien) {
            res.redirect('/dashboard');
        }
    }
    catch(err) {
        res.status(500).send({message:'Data delete Error !!!'});
    }
}

// Update a data
exports.update = async(req, res) => {

    try {
        const alien = await restaurant_model.findOneAndUpdate({ _id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        });
        const a1 = await alien.save()
        if(a1) {
            res.redirect('/dashboard');
        }
    }
    catch(err) {
        res.status(500).send({message:'Data Update Error !!!'});
    }
}
