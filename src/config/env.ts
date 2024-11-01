export const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
};

if (!config.apiUrl) {
    throw new Error('REACT_APP_API_URL is not defined');
}