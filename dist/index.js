"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsageStatics = exports.DeleteImage = exports.UpdateImage = exports.GetImageInfo = exports.GetUploadURL = exports.Init = void 0;
const axios_1 = __importDefault(require("axios"));
let account_id = null;
let token = null;
/**
 * Init SDK
 * @param account_id cloudflare account_id
 * @param token cloudflare access token
 */
const Init = (accountID, Token) => {
    account_id = accountID;
    token = Token;
};
exports.Init = Init;
/**
 * get upload url
 * @param expiry url expire time, minimum 2 minutes & maximun 6 hours, default is undefined
 */
const GetUploadURL = (expiry = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!account_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield (0, axios_1.default)({
            method: 'POST',
            url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/direct_upload`,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return { id: data.result.id, uploadURL: data.result.uploadURL };
    }
    catch (error) {
        return { errorMessages: error.response.data };
    }
});
exports.GetUploadURL = GetUploadURL;
/**
 * Get image info
 * @param image_id image_id
 */
const GetImageInfo = (image_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!account_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield (0, axios_1.default)({
            method: 'GET',
            url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return data.result;
    }
    catch (error) {
        return { errorMessages: error.response.data };
    }
});
exports.GetImageInfo = GetImageInfo;
/**
 * Update image
 * It might be change the image_id
 * @param image_id image_id
 * @param requireSignedURLs set image private, default is true
 */
const UpdateImage = (image_id, requireSignedURLs = true) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!account_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield (0, axios_1.default)({
            method: 'PATCH',
            url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            data: { requireSignedURLs },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return data.result;
    }
    catch (error) {
        return { errorMessages: error.response.data };
    }
});
exports.UpdateImage = UpdateImage;
/**
 * Delete image
 * @param image_id image_id
 */
const DeleteImage = (image_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!account_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield (0, axios_1.default)({
            method: 'DELETE',
            url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/${image_id}`,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return null;
    }
    catch (error) {
        return { errorMessages: error.response.data };
    }
});
exports.DeleteImage = DeleteImage;
/**
 * Get GetUsageStatics
 * Will Return current and allowed
 */
const GetUsageStatics = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!account_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield (0, axios_1.default)({
            method: 'GET',
            url: `https://api.cloudflare.com/client/v4/accounts/${account_id}/images/v1/stats`,
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return data.result;
    }
    catch (error) {
        return { errorMessages: error.response.data };
    }
});
exports.GetUsageStatics = GetUsageStatics;
