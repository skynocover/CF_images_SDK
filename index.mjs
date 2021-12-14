import axios from 'axios';

let account_id = null;
let token = null;

/**
 * Init SDK
 * @param account_id cloudflare account_id
 * @param token cloudflare access token
 */
export const Init = (accountID, Token) => {
  account_id = accountID;
  token = Token;
};

/**
 * get upload url
 * @param expiry url expire time, minimum 2 minutes & maximun 6 hours, default is undefined
 */
export const GetUploadURL = async (expiry = undefined) => {
  try {
    if (!account_id || !token) {
      return { errorMessages: 'Please Init first' };
    }
    const { data } = await axios({
      method: 'POST',
      url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/direct_upload`,
      data: { requireSignedURLs: signed },
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return { id: data.result.id, uploadURL: data.result.uploadURL };
  } catch (error) {
    return { errorMessages: error.response.data };
  }
};

/**
 * Get image info
 * @param image_id image_id
 */
export const GetImageInfo = async (image_id) => {
  try {
    if (!account_id || !token) {
      return { errorMessages: 'Please Init first' };
    }
    const { data } = await axios({
      method: 'GET',
      url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    });
    if (!data.success) {
      return { errorMessages: data.messages };
    }
    return data.result;
  } catch (error) {
    return { errorMessages: error.response.data };
  }
};

/**
 * Update image
 * It might be change the image_id
 * @param image_id image_id
 * @param requireSignedURLs set image private, default is true
 */
export const UpdateImage = async (image_id, requireSignedURLs = true) => {
  try {
    if (!account_id || !token) {
      return { errorMessages: 'Please Init first' };
    }
    const { data } = await axios({
      method: 'PATCH',
      url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      data: { requireSignedURLs },
    });
    if (!data.success) {
      return { errorMessages: data.messages };
    }
    return data.result;
  } catch (error) {
    return { errorMessages: error.response.data };
  }
};

/**
 * Delete image
 * @param image_id image_id
 */
export const DeleteImage = async (image_id) => {
  try {
    if (!account_id || !token) {
      return { errorMessages: 'Please Init first' };
    }
    const { data } = await axios({
      method: 'DELETE',
      url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    });
    if (!data.success) {
      return { errorMessages: data.messages };
    }
    return null;
  } catch (error) {
    return { errorMessages: error.response.data };
  }
};

/**
 * Get GetUsageStatics
 * Will Return current and allowed
 */
export const GetUsageStatics = async () => {
  try {
    if (!account_id || !token) {
      return { errorMessages: 'Please Init first' };
    }
    const { data } = await axios({
      method: 'GET',
      url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/stats`,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    });
    if (!data.success) {
      return { errorMessages: data.messages };
    }
    return data.result;
  } catch (error) {
    return { errorMessages: error.response.data };
  }
};
