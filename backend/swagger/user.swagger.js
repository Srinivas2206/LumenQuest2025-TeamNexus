const express = require("express");
const swaggerUi = require("swagger-ui-express");

const userDocs = {
    openapi: "3.0.0",
    info: {
        title: "User API",
        version: "1.0.0",
        description: "Manage users with role-based permissions",
    },
    servers: [{ url: "/api/users" }],
    components: {
        securitySchemes: {
            BasicAuth: {
                type: "http",
                scheme: "basic",
                description: "Use your **email** as the Username field and your password as the Password field when authorizing.",
            },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    role: { type: "string", enum: ["user", "admin"] },
                },
            },
        },
    },
    paths: {
        "/": {
            post: {
                summary: "Create a new user (anybody)",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
                },
                responses: {
                    201: { description: "User created successfully" },
                    400: { description: "User already exists" },
                },
            },
            get: {
                summary: "Get all users (admin only)",
                security: [{ BasicAuth: [] }],
                responses: {
                    200: { description: "List of users" },
                    403: { description: "Forbidden" },
                },
            },
        },
        "/{id}": {
            get: {
                summary: "Get user by ID (anybody)",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                    200: { description: "User object" },
                    404: { description: "Not found" },
                },
            },
            put: {
                summary: "Update user by ID (anybody updates their own data)",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                requestBody: {
                    content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
                },
                responses: {
                    200: { description: "User updated successfully" },
                    404: { description: "User not found" },
                },
            },
            delete: {
                summary: "Delete user by ID (admin only)",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                security: [{ BasicAuth: [] }],
                responses: {
                    200: { description: "User deleted successfully" },
                    403: { description: "Forbidden" },
                    404: { description: "User not found" },
                },
            },
        },
    },
};

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(userDocs));
module.exports = router;
