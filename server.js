const express = require("express");
const app = express();
const cors = require("cors");

// const {User, Pet} = require("models/user.model");
const {Pet} = require("./server/models/user.model");
// This will fire our mongoose.connect statement to initialize our database connection
require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));


// This is where we import the users routes function from our user.routes.js file
app.use(cors());
require("./server/routes/user.routes")(app);
// End


const server = app.listen(8000, () => console.log("The server is ready. Rip and Tear on port 8000."));

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("Hello world! someone has connected to the server!")

    socket.on("test_event", data => {
        console.log("This is a test of the io system.");
        socket.emit("retest_event", data);
    })
    socket.on("get_pets", data => {
        Pet.find()
            .then(allPets => socket.emit("pet_package", allPets))
            .catch(err => res.json({message:"something went wrong", error: err}));
    })
    socket.on("delete_pet", data => {
        console.log("deleting pet here");
        Pet.deleteOne( { _id: data.id})
            .then(res => {
                Pet.find()
                    .then(allPets => {
                        socket.emit("pet_package", allPets);
                        socket.broadcast.emit("pet_package", allPets)});
            })
    })
    socket.on("only_pet", data => {
        console.log("finding a single pet here");
        Pet.findOne({ _id: data.id})
            .then(result => socket.emit("receive_pet", result));
    })

    socket.on("new_pet", data => {
        console.log("creating and validating new pet");
        let errors = []
        let allPets; 
        Pet.findOne({ name: data.name}).then(result => {
            console.log(result);
            allPets=result;
            console.log(allPets)
            if(allPets != null){
                errors.push("This name already exits");
            }
            if(data.name.length < 3){
                errors.push("Name is too short");
            }
            if(data.type.length < 3){
                errors.push("type is too short");
            }
            if(data.description.length < 3){
                errors.push("Description is too short");
            }
            if(errors.length > 0){
                socket.emit("not_valid", errors);
            }else{
                Pet.create(data)
                    .then(socket.emit("valid", errors))
            }
        });
        
    })

    socket.on("edit_pet", data => {
        console.log("editing pets");
        let errors = []
        if(data.state.name.length < 3){
            errors.push("Name is too short");
        }
        if(data.state.type.length < 3){
            errors.push("type is too short");
        }
        if(data.state.description.length < 3){
            errors.push("Description is too short");
        }
        if(errors.length > 0){
            socket.emit("not_valid", errors);
        }else{
            Pet.findOneAndUpdate({ _id: data.id}, data.state, {new: true})
                .then(result => socket.emit("valid", result));
        }
    })
})
