const express = require('express');
const sequelize = require('./db')
require('dotenv').config();
const router = require('./router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-middlewares')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Testovoe Zennex API`s',
            version: '1.0.0',
            description: 'None',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
            },
        ],
    },
    apis: ['./router/*.js', './controller/*.js'], // Путь к вашим маршрутам и контроллерам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express()

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(`Database connect error: ${e}!`)
    }
}

start()