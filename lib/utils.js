export const generateOtpCode = () => {
  const otp = Math.floor(10000 + Math.random() * 90000);
  return otp;
};
