const express = require("express");
const swaggerUi = require("swagger-ui-express");

const userDocs = {
    openapi: "3.0.0",
    info: {
        title: "User API (Basic Auth)",
        version: "1.0.0",
        description: "User management with HTTP Basic Authentication",
    },
    servers: [{ url: "/api/users" }],
    components: {
        securitySchemes: {
            basicAuth: {
                type: "http",
                scheme: "basic",
            },
        },
        schemas: {
            UserRegister: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: { type: "string", example: "John Doe" },
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "securePass123" },
                    role: { type: "string", enum: ["user", "admin"], example: "user" },
                },
            },
        },
    },
    paths: {
        "/register": {
            post: {
                summary: "Register a new user",
                tags: ["Users"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UserRegister" },
                        },
                    },
                },
                responses: { 201: { description: "User registered" } },
            },
        },
        "/me": {
            get: {
                summary: "Get current user profile",
                tags: ["Users"],
                security: [{ basicAuth: [] }],
                responses: { 200: { description: "Current user profile" } },
            },
        },
        "/": {
            get: {
                summary: "Get all users (admin only)",
                tags: ["Users"],
                security: [{ basicAuth: [] }],
                responses: { 200: { description: "List of users" } },
            },
        },
        "/{id}": {
            get: {
                summary: "Get user by ID (admin only)",
                tags: ["Users"],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                security: [{ basicAuth: [] }],
                responses: { 200: { description: "User object" }, 404: { description: "Not found" } },
            },
            put: {
                summary: "Update user (self or admin)",
                tags: ["Users"],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                security: [{ basicAuth: [] }],
                responses: { 200: { description: "Updated user" } },
            },
            delete: {
                summary: "Delete user (admin only)",
                tags: ["Users"],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                security: [{ basicAuth: [] }],
                responses: { 200: { description: "Deleted successfully" } },
            },
        },
    },
};

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(userDocs));

module.exports = router;
