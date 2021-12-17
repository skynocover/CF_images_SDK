/**
 * Init SDK
 * @param account_id cloudflare account_id
 * @param token cloudflare access token
 */
export declare const Init: (accountID: string, Token: string) => void;
/**
 * get upload url
 * @param expiry url expire time, minimum 2 minutes & maximun 6 hours, default is undefined
 */
export declare const GetUploadURL: (expiry?: string | undefined) => Promise<{
    errorMessages: any;
    id?: undefined;
    uploadURL?: undefined;
} | {
    id: any;
    uploadURL: any;
    errorMessages?: undefined;
}>;
/**
 * Get image info
 * @param image_id image_id
 */
export declare const GetImageInfo: (image_id: string) => Promise<any>;
/**
 * Update image
 * It might be change the image_id
 * @param image_id image_id
 * @param requireSignedURLs set image private, default is true
 */
export declare const UpdateImage: (image_id: string, requireSignedURLs?: boolean) => Promise<any>;
/**
 * Delete image
 * @param image_id image_id
 */
export declare const DeleteImage: (image_id: string) => Promise<{
    errorMessages: any;
} | null>;
/**
 * Get GetUsageStatics
 * Will Return current and allowed
 */
export declare const GetUsageStatics: () => Promise<any>;
