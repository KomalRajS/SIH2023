if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { session } = require("passport");
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACC_ID;
const authToken = process.env.TWILIO_ACCESS_TOKEN;
const client = twilio(accountSid, authToken);

module.exports.verify = async (req, res) => {
  const userPhoneNumber = req.body.country_code + req.body.phone_no;
  const verificationCode = generateVerification();
  console.log(verificationCode);
  session.verificationCode = verificationCode;
  client.messages
    .create({
      body: `Your verification code is: ${verificationCode}`,
      from: "+1 984 355 8631",
      to: userPhoneNumber,
    })
    .then((message) => res.send({ message: "Verification code sent ✅" }))
    .catch((error) => res.send({ message: "Invalid phone numberr" }));
};

const generateVerification = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
