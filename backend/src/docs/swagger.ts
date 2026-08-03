import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mangata & Gallo Luxury Commerce API',
      version: '2.5.0',
      description: 'Production-grade enterprise SaaS API documentation for Mangata & Gallo luxury jewelry platform.',
      contact: {
        name: 'Mangata & Gallo Atelier Engineering',
        email: 'engineering@mangatagallo.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local Development Server (v1 API)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'usr-vip-001' },
            name: { type: 'string', example: 'Lady Mariana Gallo' },
            email: { type: 'string', example: 'vip.client@mangatagallo.com' },
            role: { type: 'string', enum: ['CUSTOMER', 'VIP', 'ADMIN'], example: 'VIP' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'prd-001' },
            name: { type: 'string', example: 'The Celestial Solitaire Diamond Ring' },
            description: { type: 'string', example: 'Handcrafted 18k yellow gold solitaire ring with brilliant-cut diamond.' },
            price: { type: 'number', example: 4850.0 },
            category: { type: 'string', example: 'Rings' },
            image: { type: 'string', example: '/assets/ring-1.webp' },
            stock: { type: 'integer', example: 15 },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Invalid credentials or expired token' },
            status: { type: 'integer', example: 401 },
          },
        },
      },
    },
  },
  apis: ['./backend/src/routes/*.ts', './backend/src/modules/**/*.ts', './src/server.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
