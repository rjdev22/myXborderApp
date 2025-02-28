const API_DOMAIN='https://uat.myxborder.com'
const baseUrl = `${API_DOMAIN}/api/v1`;

export const imageUrl = `${API_DOMAIN}`;
export const registerApi = `${baseUrl}/register`;
export const loginApi = `${baseUrl}/login`;
export const homeApi = `${baseUrl}/home`;
export const referralAmountApi = `${baseUrl}/referral_amount`;
export const emailVarificationApi = `${baseUrl}/email_verification`;
export const varifyOtpApi = `${baseUrl}/verify_email_otp`;
export const ShopNShipOrders=`${baseUrl}/order/list/shopnship`;
export const AssistedShopNShipOrders=`${baseUrl}/order/list/assistedshopnship`;
export const InternationalOrders=`${baseUrl}/order/list/internationalshipment`;
export const createShopNShipOrder=`${baseUrl}/order/create/shopnship`;
export const createAssistedSopNShipOrder =`${baseUrl}/order/create/assistedshopnship`;
export const createInternationalShipmentOrder =`${baseUrl}/order/create/internationalshipment`;             