import * as request from "supertest";
import app from "./app";

describe("Authentication and Authorization", () => {
  it("should redirect unauthenticated users to the login page", async () => {
    const res = await request(app).get("/home");
    expect(res.status).toEqual(302);
    expect(res.header["location"]).toEqual("/auth/google");
  });

  it("should not allow authenticated users to access home page without authentication", async () => {
    await request(app).get("/auth/google");
    const res = await request(app).get("/home");
    expect(res.status).toEqual(302);
    expect(res.text).toEqual("Found. Redirecting to /auth/google");
  });
});




// import * as passport from "passport";
// import * as request from "supertest";
// import { app } from "./index";

// jest.mock("passport-google-oauth20", () => {
//   return {
//     Strategy: jest.fn(),
//     authenticate: jest.fn(),
//   };
// });

// describe("Google authentication flow", () => {
//   it("should redirect to Google login page", async () => {
//     const response = await request(app).get("/auth/google");

//     // Assuming your Google authentication route redirects to Google's authentication page
//     expect(response.statusCode).toBe(302); // Redirect status code
//     expect(response.headers.location).toMatch(
//       /^https:\/\/accounts\.google\.com/
//     );
//   });

//   it("should handle successful Google authentication callback", async () => {
//     // Mock the passport.authenticate function
//     passport.authenticate = jest.fn((authType, options, callback) => () => { callback('This is an error', null); });
//     (passport.authenticate as jest.Mock).mockImplementationOnce(
//       (strategy, options, callback) => {
//         return (req, res, next) => {
//           // Simulate successful authentication
//           req.user = { id: "googleUserId", displayName: "Google User" };
//           return callback(null, req.user);
//         };
//       }
//     );

//     const response = await request(app).get("/auth/google/callback");

//     // Assuming successful authentication redirects to the home page
//     expect(response.statusCode).toBe(302); // Redirect status code
//     expect(response.headers.location).toBe("/"); // Adjust the expected redirect URL

//     // Assuming the user profile route returns user information
//     const userProfileResponse = await request(app).get("/profile");
//     expect(userProfileResponse.statusCode).toBe(200);
//     expect(userProfileResponse.body).toEqual({
//       id: "googleUserId",
//       displayName: "Google User",
//     });
//   });
// });
