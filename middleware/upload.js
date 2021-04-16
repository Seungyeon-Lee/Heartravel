module.exports= {

    fileFilter: (req, file, callback) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; 
        if(!allowedTypes.includes(file.mimetype)) {
            var err = new Error("Incorrect file"); 
            err.code = "INCORRECT_FILETYPE"; 
            return callback(err, false); 
        }
        callback(null, true); 
    }


}