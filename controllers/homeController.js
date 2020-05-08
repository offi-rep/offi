(
    (homeController) => {
        homeController.init = (app) => {
            app.get('/',(req,res) => {
                res.send("home controller /");
            })
        }
    }
)(module.exports);