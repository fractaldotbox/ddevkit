
## Server Side Rendering
- Work in Progress.
- Base on Radix UI
https://www.radix-ui.com/primitives/docs/guides/server-side-rendering


- provide receipes to host at next / cloudflare pages
- TODO better hydration
- SEO optimization
- With the goal of reducing JS footprint, there're ideas like partial hydration / [Islands Architecture](https://www.patterns.dev/vanilla/islands-architecture/), developer take explicit control on when to dynamic load data.
- It is a challenge as the general pattern is to use a top level query client / config provider at wagmi/tanstack query(https://frontendatscale.com/blog/islands-architecture-state/)

  - since v4, It is possible to use different/shared query client at each microfrontend  https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5/#removed-custom-context-prop-in-favor-of-custom-queryclient-instance




## React Version
Primitives in React versions less than 18 rely on hydration for ids (used in aria attributes) to avoid server/client mismatch errors.


https://ahooks.js.org/guide/blog/ssr/


Server-Side Data Fetching: Utilize the `useEffect` hook with empty dependency array to perform data fetching on the server side. This ensures that data is fetched before rendering the component.