import Address from "../Model/Address.js";


// Controller to add new address
export const newaddressController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      streetAddress,
      country,
      city,
      state,
      postcode,
    } = req.body;
    const newAddress = new Address({
      firstname,
      lastname,
      email,
      phone,
      streetAddress,
      country,
      city,
      state,
      postcode,
    });
    await newAddress.save();
    res
      .status(201)
      .json({
        success: true,
        message: "New address added successfully",
        data: newAddress,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in adding new address", error });
  }
};


//get addresses
export const getaddressController=async(req,res)=>{
    try {
        const address=await Address.find({});
        res.json({ success: true, message: "Addresses fetched successfully", Address: address });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error in getting addresses", error });
        
    }
};

//delete addresses
export const deleteaddressController=async(req,res)=>{
try {
  const {id}=req.params;
  const address=await Address.findByIdAndDelete(id);
  if(!address){
    return res.status(404).json({ success: false, message: "Address not found" });
  }
  res.json({ success: true, message: "Address deleted successfully", address });
  
} catch (error) {
  console.log(error);
  res.status(500).json({ success: false, message: "Error in deleting addresses", error });
}
};