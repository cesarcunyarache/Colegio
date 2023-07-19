import {config} from 'dotenv';

config();

export default {
    port: process.env.PORT || 4000
}

export const TOKEN_SECRET = 'password-secret'