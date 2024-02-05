// import { ctrlWrapper } from "../../decorators/index.js";
// import queryString from "query-string";
// import "dotenv/config";

// const { GOOGLE_CLIENT_ID, BASE_URL } = process.env;

// const googleAuth = async (req, res) => {
//     const stringifiedParams = queryString.stringify({
//         client_id: GOOGLE_CLIENT_ID,
//         redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
//         scope: [
//             "https://www.googleapis.com/auth/userinfo.email",
//             "https://www.googleapis.com/auth/userinfo.profile",
//         ].join(" "),
//         response_type: "code",
//         access_type: "offline",
//         prompt: "consent",
//     });

//   return res.redirect(
//     `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
//   );
// };

// export default ctrlWrapper(googleAuth);
