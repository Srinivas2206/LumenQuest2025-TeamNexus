const swaggerUi = require("swagger-ui-express");

const subscriptionDocs = {
    openapi: "3.0.0",
    info: {
        title: "Subscription API",
        version: "1.0.0",
        description: "Manage subscriptions",
    },
    servers: [{ url: "/api/subscriptions" }],
    components: {
        schemas: {
            Subscription: {
                type: "object",
                properties: {
                    user: { type: "string" },
                    plan: { type: "string" },
                    status: { type: "string", enum: ["ACTIVE", "CANCELLED", "PENDING", "PAUSED"] },
                    autoRenew: { type: "boolean" },
                },
            },
        },
    },
    paths: {
        "/": {
            post: {
                summary: "Create subscription",
                requestBody: {
                    required: true,
                    content: { "application/json": { schema: { $ref: "#/components/schemas/Subscription" } } },
                },
                responses: { "201": { description: "Created" } },
            },
            get: {
                summary: "Get all subscriptions (Admin only)",
                security: [{ BasicAuth: [] }],
                responses: { "200": { description: "List of subscriptions" } },
            },
        },
        "/{id}": {
            get: { summary: "Get subscription by ID", responses: { "200": { description: "Subscription found" } } },
            put: { summary: "Update subscription", responses: { "200": { description: "Subscription updated" } } },
            delete: {
                summary: "Delete subscription (Admin only)",
                security: [{ BasicAuth: [] }],
                responses: { "200": { description: "Deleted" } },
            },
        },
    },
};

module.exports = [swaggerUi.serve, swaggerUi.setup(subscriptionDocs)];
