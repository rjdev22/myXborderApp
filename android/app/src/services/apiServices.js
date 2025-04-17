const APP_DOMAIN = process.env.APP_DOMAIN;
console.log('env variables',APP_DOMAIN);
const baseUrl = `${APP_DOMAIN}/api/v1`;

console.log('base url',baseUrl);

export const basUrl = baseUrl;
//auth url
export const imageUrl = `${APP_DOMAIN}`;
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
export const AddItemToOrder=`${baseUrl}/order/add_item`;
export const orderDetails=`${baseUrl}/order_detail`;
export const searchshopnshipOrder=`${baseUrl}/list/orders/shopnship`;
export const searchAssistedOrder=`${baseUrl}/list/orders/assistedshopnship`;
export const searchInternationalOrder=`${baseUrl}/list/orders/internationalShipment`;
export const OrderHistoryUrl=`${baseUrl}/order/history`;




//address url
export const getExistAddressList = `${baseUrl}/address/list`;
export const CreateNewAddressURl=`${baseUrl}/address/create`;
export const UpdateAddressURl=`${baseUrl}/order/update_delivery_address`;
export const DeleteAddressURl=`${baseUrl}/address/delete/`;


//common url
export const get_item_types=`${baseUrl}/get_all_item`;
export const get_order_types=`${baseUrl}/get_order_types`;
export const get_courier_types=`${baseUrl}/get_courier_types`;
export const get_all_country=`${baseUrl}/get_all_country`;
export const get_order_notification=`${baseUrl}/notification/order_notifications`;
export const get_payment_notification=`${baseUrl}/notification/payment_notifications`;
export const get_wallet_history=`${baseUrl}/wallet/history`;
export const get_Bank_detail=`${baseUrl}/bank_detail`;



//STRIPE PAYMENT

export const create_payment_intent=`${baseUrl}/shipping/stripe`;

//paypal payment


export const paypalCheckoutSession = `${baseUrl}/paypal/create_checkout_session`;

