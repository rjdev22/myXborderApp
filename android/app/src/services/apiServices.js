const API_DOMAIN = 'https://uat.myxborder.com'
const baseUrl = `${API_DOMAIN}/api/v1`;


//auth url
export const imageUrl = `${API_DOMAIN}`;
export const registerApi = `${baseUrl}/register`;
export const loginApi = `${baseUrl}/login`;
export const homeApi = `${baseUrl}/home`;
export const referralAmountApi = `${baseUrl}/referral_amount`;
export const emailVarificationApi = `${baseUrl}/email_verification`;
export const varifyOtpApi = `${baseUrl}/verify_email_otp`;
export const getUserProfile = `${baseUrl}/user/profile`;
export const updateUserProfile = `${baseUrl}/user/update_profile`;
export const deleteAccountApi=`${baseUrl}/user/remove_account`;


//orders url

export const ShopNShipOrders = `${baseUrl}/order/list/shopnship`;
export const AssistedShopNShipOrders = `${baseUrl}/order/list/assistedshopnship`;
export const InternationalOrders = `${baseUrl}/order/list/internationalshipment`;
export const createShopNShipOrder = `${baseUrl}/order/create/shopnship`;
export const createAssistedSopNShipOrder = `${baseUrl}/order/create/assistedshopnship`;
export const createInternationalShipmentOrder = `${baseUrl}/order/create/international`;

//address url
export const getExistAddressList = `${baseUrl}/address/list`;
export const CreateNewAddressURl=`${baseUrl}/address/create`;


//common url


export const get_item_types=`${baseUrl}/get_all_item`;
export const get_order_types=`${baseUrl}/get_order_types`;
export const get_courier_types=`${baseUrl}/get_courier_types`;
export const get_all_country=`${baseUrl}/get_all_country`