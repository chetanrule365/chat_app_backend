import { model, Schema } from "mongoose";

const userSchema = new Schema({
    contact_no: {
        type: String,
        minlength: [10, "Contact number should be of length 10"],
        maxlength: [10, "Contact number should be of length 10"],
        required: true,
    },
    username: {
        type: String,
        minlength: [3, "Username should be atleast 3-chars long"],
        maxlength: 255,
        required: true,
    },
});

const User = model("User", userSchema);

export default User;
