"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTestData = void 0;
exports.loginTestData = {
    validCredentials: {
        username: 'Admin',
        password: 'admin123',
        expected: {
            success: true,
            message: 'Dashboard'
        }
    },
    invalidCredentials: {
        username: 'invalid',
        password: 'invalid',
        expected: {
            success: false,
            message: 'Invalid credentials'
        }
    },
    emptyUsername: {
        username: '',
        password: 'admin123',
        expected: {
            success: false,
            message: 'Required'
        }
    },
    emptyPassword: {
        username: 'Admin',
        password: '',
        expected: {
            success: false,
            message: 'Required'
        }
    },
    specialCharacters: {
        username: 'Admin@#$',
        password: 'admin123@#$',
        expected: {
            success: false,
            message: 'Invalid credentials'
        }
    },
    longPassword: {
        username: 'Admin',
        password: 'a'.repeat(101),
        expected: {
            success: false,
            message: 'Invalid credentials'
        }
    },
    longUsername: {
        username: 'a'.repeat(101),
        password: 'admin123',
        expected: {
            success: false,
            message: 'Invalid credentials'
        }
    }
};
