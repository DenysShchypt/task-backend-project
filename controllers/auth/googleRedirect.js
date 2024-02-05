// import { ctrlWrapper } from "../../decorators/index.js";
// import { HttpError } from "../../helpers/index.js";
// import { User } from "../../models/index.js";

// import url from "url";
// import queryString from "query-string";
// import axios from "axios";
// import "dotenv/config";

// const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, BASE_URL, FRONT_BASE_URL } =
//     process.env;

// const googleRedirect = async (req, res) => {
//     const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
//     const urlObj = new url(fullUrl);
//     const urlParams = queryString.parse(urlObj.search);
//     const code = urlParams.code;

//     const tokenData = await axios({
//         url: `https://oauth2.googleapis.com/token`,
//         method: "post",
//         data: {
//             client_id: GOOGLE_CLIENT_ID,
//             client_secret: GOOGLE_SECRET,
//             redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
//             grant_type: "authorization_code",
//             code,
//         },
//     });

//     const userData = await axios({
//         url: "https://www.googleapis.com/oauth2/v2/userinfo",
//         method: "get",
//         headers: {
//             Authorization: `Bearer ${tokenData.data.access_token}`,
//         },
//     });

//     console.log(userData);

//     // інфа по юзеру. ?token=${token}&refreshToken={refreshToken}
//     return res.redirect(
//         `${FRONT_BASE_URL}/google-redirect/?${userData.data.email}`
//     );
// };

// export default ctrlWrapper(googleRedirect);
