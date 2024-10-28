
const db = require('../config/db'); 

// post api for slider 
const addSlider = async (req, res) => {
    try {
        const { title, details } = req.body;
        const photo = `${req.file.filename}`;
        // Basic validation
        if (!photo || !title || !details) {
            return res.status(400).json({ message: 'Photo, title, and details are required.' });
        }

        // SQL query to insert the new slider into the database
        const query = 'INSERT INTO sliders (photo, title, details) VALUES (?, ?, ?)';
        const values = [photo, title, details];

        // Execute the query
        await db.execute(query, values);

        // Respond with the new slider data
        res.status(201).json({ photo, title, details });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// get slider

const getSlider = async(req, res) => {
     try {
        const data = await db.query("SELECT * FROM sliders");
        
        if(!data){
            return res.status(404).send({
                success:false,
                message:"Data not Found"
            })
        }
        res.status(200).send({
            success:true,
            message:"all data",
            data:data[0],
        })
        
     }catch (error) {
        console. log(error);
        res.status(500).send({
            success:false,
            message:"Server Error",
            error
        })
     }
}
module.exports = { addSlider,getSlider };
