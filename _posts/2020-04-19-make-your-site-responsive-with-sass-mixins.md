---
title: Make your Site Responsive with SASS Mixins
layout: post
date: 2020-04-19
image: "assets/img/responsive.jpg"
---

I've been working on my demo project [Ching's Kitchen]("http://chings-kitchen.ching-wang.io/") for an online course from Edx CS50. One of the requirements for this project is that it has a responsive design. I used CSS media queries and Sass Mixins, and I would like to share some thoughts and things I've learnt from working on this project.

CSS media queries let you target various different media states as your design is rendered on a device. You can target all sorts of things including touch screens, printers, screen readers and so on. A common use of media queries is adjusting a design based on different display widths to achieve a responsive design.

For example, we might want to have a base font size and line spacing for h1
elements, and then adjust it to improve the design on larger screens.

We can use a CSS media query to do that:

```css
.foobarHeader {
  font-size: 1.5em;
  line-height: 1.25em;
}

@media screen and (min-width: 768px) {
  .foobarHeader {
    font-size: 1.8em;
    line-height: 1.5em;
  }
}
```

Note that you can also have the browser apply a media query to an entire
stylesheet via HTML:

```html
<link
  rel="stylesheet"
  media="screen and (min-width: 768px)"
  href="css/mediumWidthScreens.css"
/>
```

This works well but can be difficult to maintain in CSS, as you can end up with
the styling for a single component scattered across different media query
selectors.

For example:

```css
@media (min-width: 480px) AND (min-width: 991px) {
  .about-container {
    padding: 2em;
  }
}
@media (min-width: 992px) and (max-width: 1199.98px) {
  .about-container {
    padding: 1.5em;
  }
}

@media (min-width: 1200px) {
  .about-container {
    padding: 1em;
  }
}
```

SASS mixins can help with this. Mixins are kind of like functions or templates
that you can use to make your styling code more maintainable. Mixins are useful for
handling media queries, as you can define mixins for the breakpoints in your design
in one place and then re-use them.

```scss
$small-width: 480px;
$medium-width: 768px;
$large-width: 1024px;

@mixin extra-small {
  @media (max-width: #{$small-width - 1px}) {
    @content;
  }
}

@mixin small-down {
  @media (max-width: #{$medium-width - 1px}) {
    @content;
  }
}

@mixin small-only {
  @media (min-width: #{$small-width}) and (max-width: #{$medium-width - 1px}) {
    @content;
  }
}

@mixin small-up {
  @media (min-width: #{$small-width}) {
    @content;
  }
}

@mixin medium-only {
  @media (min-width: #{$medium-width}) and (max-width: #{$large-width - 1px}) {
    @content;
  }
}

@mixin medium-up {
  @media (min-width: #{$medium-width}) {
    @content;
  }
}

@mixin large {
  @media (min-width: #{$large-width}) {
    @content;
  }
}
```

You can also nest the breakpoint mixin inside the selector that it applies to,
which feels much more natural and keeps all the styling for a component grouped
in one place.

```scss
@import "mixins";
//First of all we import the mixins file we created above.

.about-container {
  background-color: $text-background;
  color: #333333;
  margin: $content-margin;
  padding: 1em;

  // we use the variables that we have defined above.
  @include small-up {
    padding: 2em;
  }

  @include medium-up {
    padding: 1em;
  }
}
```

The SASS compiler will then determine how to produce correct CSS for this so you
don't have to worry about it.

## Links

- [https://css-tricks.com/css-media-queries/](https://css-tricks.com/css-media-queries/)
