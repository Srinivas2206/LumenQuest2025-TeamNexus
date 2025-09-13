// src/docs/plan.swagger.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const planDocs = {
    openapi: "3.0.0",
    info: {
        title: "Plan API",
        version: "1.0.0",
        description: "CRUD operations for subscription plans",
    },
    servers: [{ url: "/api/plans" }],
    paths: {
        "/": {
            get: {
                summary: "Get all plans",
                responses: {
                    200: {
                        description: "List of plans",
                    },
                },
            },
            post: {
                summary: "Create a new plan",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Plan",
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Plan created" },
                },
            },
        },
        "/{id}": {
            get: {
                summary: "Get a plan by ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { 200: { description: "Plan object" }, 404: { description: "Not found" } },
            },
            put: {
                summary: "Update a plan by ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { 200: { description: "Updated plan" } },
            },
            delete: {
                summary: "Delete a plan by ID",
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { 200: { description: "Deleted successfully" } },
            },
        },
    },
    components: {
        schemas: {
            Plan: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    productType: { type: "string", enum: ["FIBERNET", "COPPER", "OTHER"] },
                    monthlyPrice: { type: "number" },
                    monthlyQuotaGB: { type: "number" },
                    speedMbps: { type: "number" },
                    features: { type: "array", items: { type: "string" } },
                    isActive: { type: "boolean" },
                },
            },
        },
    },
};

const router = express.Router();
router.use("/", swaggerUi.serve, swaggerUi.setup(planDocs));
module.exports = router;
