
const { check, validationResult } = require("express-validator");
const { unlink } = require("fs")

const addUserValidator = [
    check("name")
        .isLength({ min: 3 })
        .withMessage("Name is required!")
        .isAlpha("en-US", { ignore: " -" })
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Invalid email!")
        .trim()
        .custom(async (value) => {
            try {
                const user = await user.findOne({ email: value });
                if (user) {
                    throw createError("Email alerady is use!");
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true
        })
        .withMessage("Mobile number must be a valid Bangladesh mobile number!")
        .trim()
        .custom(async (value) => {
            try {
                const user = await user.findOne({ mobile: value });
                if (user) {
                    throw createError("Mobile alerady is use!");
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage("Password must be at lest 8 character long a should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol!")
];

const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) console.log(err)
                }
            )
        }

        res.status(500).json({
            errors: mappedErrors,
        })
    }
};

module.exports = {
    addUserValidator, 
    addUserValidationHandler
};