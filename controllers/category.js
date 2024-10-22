const db = require('../config/db')
const getCategory =async (req, res) =>{
try{
    const data =await db.query('SELECT * FROM categories')
    if (!data){
        return res.status(404).send({
            success:false,
            message:'No Data',
        })
    }
    res.status(200).send({
        success:true,
        message:'all data',
        data:data[0],
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Category api',
        error
    })
}
};

// Get Subcategory

const getSubcategory = async(req, res) =>{
    try{
        const data =await db.query('SELECT * FROM subcategories')
    if (!data){
        return res.status(404).send({
            success:false,
            message:'No Data',
        })
    }
    res.status(200).send({
        success:true,
        message:' data',
        data:data[0],
    })

    }catch(error){
     console.log(error)
     res.status(500).send({
        success:false,
        message:'Error in Subcategory api'
     })
    }

};

// Get Chield Category

const getChildgetcategories = async(req, res) =>{
    try{
        const data = await db.query('SELECT * FROM chield_categories')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'no data'
            })
        }
        res.status(200).send({
            success:true,
            message:'data',
            data:data[0],
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Subcategory API"
        })
    }
};

// Get Data T Using ID

const getCategoryByID =async (req, res) => {
  try{
    const categoryId =req.params.id
    if(!categoryId){
        return res.status(404).send({
            success:false,
            message:"in valid id",
        })
    }
    
     const data = await db.query('SELECT * FROM categories WHERE id = ?', [categoryId])
     if (!data){
        return res.status(404).send({
            success:false,
            message:"Data not Found"
        })
     }
     res.status(200).send({
        success:true,
        categoryName:data[0],
        
     })

  }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Category"
    })
  }
};


// create category

// const createCategory = async(req, res) =>{
//    try {
    
//     const { name, slug, photo, meta_keywords, meta_descriptions, status, is_feature ,serial} = req.body

//     if(!name || !slug || !photo|| !meta_keywords || !meta_descriptions|| !status || !is_feature|| !serial){
//       return res.status(400).send({
//         success:false,
//         message:"please provide all fields"
//       })
//     }
//       const data = await db.query("INSERT INTO  categories (name, slug , photo, meta_keywords,meta_descriptions,status,is_feature ,serial ) VALUES (? , ? , ? , ? , ? , ? , ? , ? )", [ name, slug, photo, meta_keywords, meta_descriptions, status, is_feature ,serial])

//        if(!data){
//         return res.status(404).send({
//             success:false,
//             message:"Error in insert"

//         })
//        }
//        res.status(201).send({
//         success:true,
//         message:'category added successful',
//     })
//    } catch (error) {
//       console.log(error)
//       res.status(500).send({
//         success:false,
//         message:"Server Error",
//         error
//       })
//    }
// }
const createCategory = async (req, res) => {
  try {
    const { name, slug, photo, meta_keywords, meta_descriptions, status, is_feature, serial } = req.body;

    // Validate the required fields
    if (
      name === undefined || slug === undefined || photo === undefined ||
      meta_keywords === undefined || meta_descriptions === undefined ||
      status === undefined || is_feature === undefined || serial === undefined
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Insert into the database
    const data = await db.query(
      "INSERT INTO categories (name, slug, photo, meta_keywords, meta_descriptions, status, is_feature, serial) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, slug, photo, meta_keywords, meta_descriptions, status, is_feature, serial]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error inserting the category",
      });
    }

    // Success response
    return res.status(200).send({
      success: true,
      message: "Category added successfully",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error,
    });
  }
};


module.exports = {getCategory,getSubcategory,getChildgetcategories,getCategoryByID,createCategory};