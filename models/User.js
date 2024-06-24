const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash } = require("bcrypt");
const Counter = require("./Counter");

const UserSchema = new Schema({
    id: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        try {
            const counterDoc = await Counter.findByIdAndUpdate(
                { _id: 'userId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            doc.id = counterDoc.seq;
        } catch (error) {
            return next(error);
        }
    }
    next();
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hash(this.password, 10);
});
module.exports = mongoose.model("User", UserSchema) || mongoose.models.User;