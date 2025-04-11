# Nextflix

_A movie searching app made for demo purposes._  
[Demo][demo] | [Repository][repository]

---

### Getting Started

Clone the repository, install the dependencies, and run the application.

```zsh
gh repo clone bradgarropy/nextflix
cd nextflix
npm install
npm run dev
```

### Built With

I used a few notable technologies while building this application.

- [React][react]
- [TypeScript][typescript]
- [Next.js][nextjs]
- [Tailwind][tailwind]
- [Apollo][apollo]
- [Shadcn][shadcn]
- [Motion][motion]
- [GitHub Actions][actions]

Open your browser to [http://localhost:3000][localhost] to see the application!

### Interesting Bits

Working with Next.js client and server components was interesting! It's a nice exercise in user experience to think through where the data and actions should go.

After trying the limited REST API, I realized that the GraphQL API would offer more functionality with less network requests. So I decided to create a little [GraphQL client][graphql] that took care of the authentication.

### Proud Developer

Normally my design sense is [pretty minimal][bradgarropy], but for this exercise I wanted the application to feel a bit more polished. So I used [Shadcn][shadcn] components, coupled with some animations via [Motion][motion] that made the application feel really good.

### Next Features

Given more time, I'd flesh out the application more with dedicated pages for each movie and genre, an account system where you could save movies to watch later, and add some sorting options based on length or rating. I'd also work more on mobile responsiveness to make the app feel good on small devices. The information can be a bit dense at times.

But moreover, I feel like there are numerous improvemts that could be made to the backend! More filter parameters, some sort options, and including `totalCount` in the GraphQL responses would be some great improvements and could offer consumers much more flexibility in how to build their application!

[localhost]: http://localhost:3000
[react]: https://react.dev
[typescript]: http://typescriptlang.org
[nextjs]: https://nextjs.org
[tailwind]: http://tailwindcss.com
[apollo]: https://apollographql.com
[shadcn]: https://ui.shadcn.com
[motion]: http://motion.dev
[repository]: https://github.com/bradgarropy/nextflix
[demo]: https://nextflix-brad-garropys-projects.vercel.app
[actions]: https://github.com/features/actions
[graphql]: src/utils/movies.ts
[bradgarropy]: https://bradgarropy.com
