/**
 * Declare variables that are populated at Build-time
 */
const { __SYS_BACKEND_HOST_URI__ } = process.env;

/**
 * Define user friend variables for consumption
 */
const BACKEND_HOST_URI = __SYS_BACKEND_HOST_URI__;

export { BACKEND_HOST_URI };
