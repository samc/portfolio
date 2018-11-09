# Sam Craig's Personal Portfolio

[Link](https://samcraig.io/)

This is my first attempt at putting together an online portfolio - so if you have any suggestions or comments on the project or anything really, you can contact me at **contact@samcraig.io** or **@samcraigdev** on Twitter. Thanks for checking it out!

## Analysis and Preparation

I knew going into the project that I wanted it to consist of something out of the ordinary. The overall **slanted** design approach really didn't surface until after I had sketched out the logo. Almost immediately after I had finished the final logo design, everything fell into place. The slanted nav bars and triangle tessellation used for the background helped to bring consistency to the overall design.

## Fixing Major Issues

Oh boy, I ran into more than my fair share of bugs / quirks throughout the development process of this project - most notably of those being performance. The downsides of making a quite interactive and dynamic site were the power and load necessary to pull it off. With some long nights of scouring documentation and the help of the friendly people over at [/r/webdev](https://www.reddit.com/r/webdev/comments/7g84co/my_first_portfolio_hows_it_look/), I managed to vastly improve both the load time and overall performance of the portfolio.

### Animation

- Rewriting @keyframe animations to translation based alternatives
- Minimizing unnecessary transition animations
- Improving mobile performance by cutting back on taxing animations ( background tesselation / header reveal )

### Load

- Designing my own SVG icons and doing away with FontAwesome alternatives
- Introducing both compressed and gzipped asset delivery with webpack
- Implementing async view rendering capabilities with Angular's ngRoute module

## Other things I learned along the way

- Improved upon my Illustrator skillset
- Hosting and DNS setup from scratch on Digital Ocean VPS using Nginx
- Free SSL implementation with LetsEncrypt
- Better understanding of SEO

## Conclusion

Before starting this project, my overall front-end skillet was lacking - as I generally put more emphasis on back-end oriented projects. The process of designing and building my own portfolio really pushed me to step out of my comfort zone and adopt a new approach to front-end development. Over the course of the project, I learned a ton of invaluable lessons that have improved my approach both to development and design.

## Color Scheme

### Accents

- ![#57a3e4](https://placehold.it/15/57a3e4/000000?text=+) `#57a3e4`
- ![#2D2E83](https://placehold.it/15/2D2E83/000000?text=+) `#2D2E83`

### Global

- ![#e3e3e5](https://placehold.it/15/e3e3e5/000000?text=+) `#e3e3e5`
- ![#707493](https://placehold.it/15/707493/000000?text=+) `#707493`
- ![#4c4f65](https://placehold.it/15/4c4f65/000000?text=+) `#4c4f65`
- ![#15151e](https://placehold.it/15/15151e/000000?text=+) `#15151e`

## Fonts

- [Khula Semi-bold](https://fonts.google.com/specimen/Khula)
- [Etna](https://www.behance.net/gallery/27266073/ETNA-Free-font)

## Built With

### Back-end

- [Node.js](https://nodejs.org/en/) - Server framework
- [Express](https://expressjs.com/) - Web framework
- [Nodemailer](https://nodemailer.com/about/) - Email delivery

### Front-end

- [AngularJS](https://angularjs.org/) - Javascript framework
- [Angular Route](https://docs.angularjs.org/api/ngRoute/service/$route) - SPA rendering
- [TimelineLite](https://greensock.com/timelinelite) - Animation timeline handler
- [Google Map API](https://developers.google.com/maps/) - Map implementation

### Webpack Config

- [UglifyJS](https://github.com/mishoo/UglifyJS) - Javascript compression
- [Babel Loader](https://github.com/babel/babel-loader) - Babel version transpiler
- [ExtractText](https://github.com/webpack-contrib/extract-text-webpack-plugin) - CSS extraction
- [PostCSS Loader](https://github.com/postcss/postcss-loader) - CSS browser compatibility
- [Compression Webpack Plugin](https://github.com/webpack-contrib/compression-webpack-plugin) - Gzip asset compression
- [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader) - Image compression

## Acknowledgments

- Maks Surguy's [Delaunay Triangulation Wallpaper Generator](https://github.com/qrohlf/trianglify) - I modified the wallpaper generator to fit seamlessly into any dynamic web based implementation.
- Reddit's [/r/webdev](https://www.reddit.com/r/webdev/comments/7g84co/my_first_portfolio_hows_it_look/) - Design critiques and suggestions