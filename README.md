# Project Github Dashboard

## Main Usage

### - data api extract to graphic and charts component

### - Authentication by Auth0 third party: @auth0/auth0-react

### - Icons by react-icons

### - charts by react-fusioncharts (fusioncharts)

### - styling by styled-components

### - deployment by netlify

---

## More Information >>

## Deployment Netlify

[Deployment Netlify](https://www.netlify.com/)

---

## Redirects with react-router-dom

In order for routing to work on netlify, redirects was added to the public folder

> ### Build  _redirects file in /public folder

```jsonc

/*    /index.html   200

```

---

## Warnings and create-react-app

> ### package.json

```js
"build": "CI= react-scripts build",
```

## Styled Components

[Styled-Components - Main Docs](https://styled-components.com/)

## React Icons

[React Icons - Main Docs](https://react-icons.github.io/react-icons/)

## React Router Dom

- [react-router-dom - Main Docs](https://reactrouter.com/web/guides/quick-start)

## GitHub API

### MockUser

- [Root Endpoint:https://api.github.com](https://api.github.com)
- [Get User:     https://api.github.com/users/wesbos](https://api.github.com/users/wesbos)
- [Repos:        https://api.github.com/users/wesbos/repos?per_page=100](https://api.github.com/users/wesbos/repos?per_page=100)
- [Followers:    https://api.github.com/users/wesbos/followers](https://api.github.com/users/wesbos/followers)
- [Rate Limit:   https://api.github.com/rate_limit](https://api.github.com/rate_limit)

> For unauthenticated requests, the rate limit allows for up to 60 requests per hour with the originating IP address

---

> When using the built-in GITHUB_TOKEN in GitHub Actions, the rate limit is 1,000 requests per hour per repository. For organizations that belong to a GitHub Enterprise Cloud account, this limit is 15,000 requests per hour per repository.

## Fusion Charts

- [Fusion Charts - Main Docs](https://www.fusioncharts.com/)
- [First React Chart](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
- [List Of Charts](https://www.fusioncharts.com/dev/chart-guide/list-of-charts)
- [Themes](https://www.fusioncharts.com/dev/themes/introduction-to-themes)

## Auth0 Authentication

- [Auth0 Authentication](https://auth0.com/)
- [React Docs](https://auth0.com/docs/libraries/auth0-react)
- Copy/Paste Domain, ClientID - can be public (or use .env)
- Add Domain - for now <http://localhost:3000>
  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins
  - SAVE CHANGES
- Connections
  email,social
