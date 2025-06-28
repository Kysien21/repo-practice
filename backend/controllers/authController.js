const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async(req, res) => {
    const { First_name, Last_name, Mobile_No, Email_Address, Password, Confirm_Password, agreeToTerms } = req.body

    if (!First_name || !Last_name || !Mobile_No || !Email_Address || !Password || !Confirm_Password) {
        return res.status(400).json({ message: "All fields are required and terms must be accepted" })
    }

    if (Password !== Confirm_Password) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ Email_Address });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists with this email' });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(Password, 10)
        console.log(First_name)
            //bag o na user dri
        const user = new User({
            First_name,
            Last_name,
            Mobile_No,
            Email_Address,
            Password: hashedPassword,
        })

        console.log("Saving new user...")

        const savedUser = await user.save()

        res.status(201).json({ message: 'You created successfully', user: savedUser })
    } catch (error) {
        console.error("❌ Signup error:", error);
        res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
}

exports.login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ Email_Address: email });
        console.log(email, password);

        if (!user) return res.status(400).json({ message: 'User Not Found' });

        const match = await bcrypt.compare(password, user.Password);

        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        req.session.user = user;

        res.status(200).json({
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};