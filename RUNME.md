## Development server

Run following command

```bash
echo "
MONGO_DB_URI=mongodb+srv://project_user_1:q3eLFwZ6DpHMXSka@cluster0.y8ly7.mongodb.net/projectdb?retryWrites=true&w=majority

AUTH0_SECRET=aaac39390f20a3bcacd95f1b53a01562067b01fd218507e072954d52f34faa67
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://dev-37yc0ze2.us.auth0.com'
AUTH0_CLIENT_ID='UswtOaFK3G5gdlahBt7u12i1h4CoD3Wd'
AUTH0_CLIENT_SECRET='S1SOPdpuwculLm2qYPWbVOVYqskQcUjJrdl-_DqyIymw4Exwst26rDM3CXEDJf67'

AUTH0_MANAGEMENT_CLIENT_ID=L2UkgOD4eN9Bn9h6D8VSEVk8rfZ4QJ2i
AUTH0_MANAGEMENT_CLIENT_SECRET=DpsEEhnhaepO19_n3yWhsPcfPWumNZ1jPyRwPrCPSliuEhPJeyxRyGxZ9iYud5gz
AUTH0_MANAGEMENT_AUDIENCE=https://dev-37yc0ze2.us.auth0.com/api/v2/
AUTH0_MANAGEMENT_DOMAIN='dev-37yc0ze2.us.auth0.com'
" > .env.local
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
