# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3001

# Set the environment variables
ENV NODE_ENV=development
ENV DEBUG=0
ENV PORT=3001
ENV JWT_SECRET=MyUltraSecurePassWordIWontForgetToChange
ENV JWT_EXPIRATION_IN_MINUTES=4320
ENV MONGO_URI=mongodb://localhost:27017/actionlearning
ENV EMAIL_FROM_NAME=MyPrject
ENV EMAIL_FROM_ADDRESS=info@myproject.com
ENV EMAIL_SMTP_DOMAIN_MAILGUN=myproject.com
ENV EMAIL_SMTP_API_MAILGUN=123456
ENV FRONTEND_URL=http://localhost:8080
ENV REDIS_HOST=127.0.0.1
ENV REDIS_PORT=6379
ENV PASSWORD_MIN_LENGTH=5
ENV RECORD_LIMIT=10
ENV PATH_ASSETS="./public/assets"
ENV URL_ASSETS="/assets"
ENV RANDOM_STRING_CHARACTERS=24
ENV TEMP_PASSWORD_EXPIRATION_IN_HOURS=3
ENV EMAIL_EXPIRATION_IN_MINUTES=180
ENV API_BASE_ROUTE="api"
ENV URL=https://api.myproject.com
ENV PATH_CATEGORY_IMAGES="/categories/"
ENV ALLOWED_IMAGE_TYPES="jpeg|jpg|png|gif"
ENV ALLOWED_DOCUMENT_TYPES="pdf"
ENV DEFAULT_BECOME_A_PROVIDER_URL="https://myproject.com"
ENV DEFAULT_BECOME_A_MANAGER_URL="https://myproject.com"
ENV DEFAULT_DESIGNER_EMAIL="designer@myproject.com"
ENV DEFAULT_BUYER_EMAIL="buyer@myproject.com"
ENV ALLOWED_LOGIN_ATTEMPTS=15
ENV LOGIN_ATTEMTS_MINUTES_TO_BLOCK=5
ENV TERMS_AND_CONDITION_URL="https://myproject.com"
ENV PRIVACY_POLICY_URL="https://myproject.com"

ENV SENDGRID_API_KEY="WRITE YOUR SENDGRID API KEY"
ENV MAIL_FROM_NAME="My Project"
ENV MAIL_FROM_ADDRESS="noreply@myproject.com"
ENV PROJECT_ADMIN_EMAIL="admin@myproject.com"
ENV PROJECT_DEVELOPER_EMAIL="developer@myproject.com"


# Start the Node.js application
CMD ["npm", "start"]
