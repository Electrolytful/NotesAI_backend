require("dotenv").config();
const User = require("./User.js");

describe("User Model", () => {

    describe("getUserById function", () => {
        it("should exist", async () => {
            expect(User.getUserById()).toBeDefined();
        });

        it("should return false if id does not exist in the database", async () => {
            expect(await User.getUserById("1cddc7e1-54a3-4e16-9d27-60786697cdb8")).toBe(false);
        })

        it("should return the correct user if the specified id exists in the database", async () => {
            const user = {username: "testuser", email: "testuser@gmail.com", hashedPassword: "password"}
            const newUser = await User.create(user);

            const { user_id } = newUser;
            expect(await User.getUserById(user_id)).toStrictEqual(newUser);
        })
    });
});
