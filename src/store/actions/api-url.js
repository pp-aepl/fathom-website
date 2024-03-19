const config = {
  version: "v1",
  version2: "v2",
  user_microservice: "user",
  common_microservice: "common", //utilities
  collection_microservice: "collections",
  notification_microservice: "notification",
  games_microservice: "games",
  ecommerce_microservice: "ecommerce",
  reels_microservice: "reels",
  events_microservice: "events",
  admin: "admin",
};
const apiURl = {
  login: `${config.version}/${config.common_microservice}/auth/login`,
  forgot: `${config.version}/${config.common_microservice}/forgot`,
  reset: `${config.version}/${config.common_microservice}/change-password`,
  applications: `${config.version}/${config.common_microservice}/applications`,
  forms: `${config.version}/${config.common_microservice}/forms`,
  rules: `${config.version}/${config.admin}/rules`,
  signDocument: `${config.version}/${config.common_microservice}/signDocument`,
};

export const NotificationMsg = {
  NotConnect: "Please connect your wallet to proceed.",
  wallet: "Please connect your wallet to proceed.",
  NotFound: `NO PAGE FOUND`,
  error: `Something went wrong`,
  mint: `Minted Successfully`,
  ipfs: `Data Converted into CID hash (content identifier)`,
  socket: `Connection not established`,
  connect: `Wallet Connected`,
  approved: `Collection hasbeen approved`,
  sell: `Sell broker created`,
  buyoffer: `Buy offer created`,
  buy: `Buy collection`,
  errorType: "File type is not valid",
  SelectNftType: "Please select contract type",
  reConnect: `Please disconnect other wallet`,
  fileUpload15MB: `Invalid file size!. Must be less than 15MB`,
  requRejected: `Request has been rejected.`,

  copyText: `Address copied successfully!`,
  changeWallet: `Please connect your %s wallet to proceed`,
  Balance: `You Don't have enough balance %s`,
  BuySuccess: `Bought successfully`,
  putOnSaleMsg: `Successfully Published`,
  putOnSaleBackMsg: `Successfully un-published`,
  offerCreate: `Offer created successfully`,
  offerCancel: `Offer canceled successfully`,
  Qty: `Please Enter The Qty`,
};

export const validationMessages = {
  deleteConfirm: "Are you sure you want to delete this item?",
  changeStatus: "Are you sure you want to do this?",
  require: "This field is required",
  blogDescriptionMax: "Description is Too Long ( Allow Max 80 Characters )",
  unableToLogin: "Unable to login. Please try after some time.",
  image: `File image is required`,
  missingFile: `File is required`,
  name: `Name is required`,
  nameMax: `Name is too long ( Maximum 100 characters )`,
  NoFcopies: `Copies are Required`,
  categories: `Categories are required`,
  price: `Price is required`,
  royalty: `Royalty is required`,
  coverimage: `Cover image is required`,
  descriptionMax: "Description is too long ( Maximum 1000 characters )",
  descriptionLow: "Description is required",
  fName: `First name is required. `,
  lName: `Last name is required. `,
  allowAlphabets: `This field allow alphabets only.`,
  emailReq: `Email is required.`,
  validEmail: `Enter valid Email`,
  passwReq: `Password is required`,
  validPass: `Password must included atleast`,
  cpasswReq: `Confirm passwords is required`,
  notMatchPassw: `Password and confirm password should be same`,
  phoneReq: `Contact number is required`,
  validMobile: `Please enter a valid mobile number.`,
  reqEnquiryType: "Enquiry type is required.",
  reqQueryMessage: "Query message is required.",
  allowMax8: "Allow max 8 characters.",
  Time_from: "From time is required",
  royality: `Royality should be less Than %s or min 1`,
  otpEnter: "Please enter OTP.",
  validOtp: `Please enter a valid OTP.`,
  invalTime: "Please enter a valid time.",
  sameTime: "To time should be greater than Form time.",
  reConnect: `Please disconnect other wallet`,
  greaterprice: `Price should be greater than or equal to 0.01`,
  selectModule: "Please select module",
  validnum: `Please enter a valid number.`,
};

export default apiURl;
