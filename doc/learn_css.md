> **Cascading Style Sheets** (**CSS**) is a [stylesheet](https://developer.mozilla.org/en-US/docs/Web/API/StyleSheet) language used to describe the presentation of a document written in [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) or [XML](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction) (including XML dialects such as [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML) or [XHTML](https://developer.mozilla.org/en-US/docs/Glossary/XHTML)). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

The above is directly from the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS) website on CSS where you can learn everything you need to know on the topic.

Start by reading the [MDN CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics) then look through the section on CSS building blocks and more advanced topics:

- [Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
- [Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) and [font](https://developer.mozilla.org/en-US/docs/Web/CSS/font).
- [Values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
- [Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators)
- [Cascade, specificity, and inheritance](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [The Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [Z-index](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index) and [Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
- [Border](https://developer.mozilla.org/en-US/docs/Web/CSS/border) and [Border Radius](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
- [Background](https://developer.mozilla.org/en-US/docs/Web/CSS/background), [Dropshadow](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow) and [Cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
- [Pseudo Classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), [Pseudo Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) & [Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)


## CSS Layout

See also: [MDN intro to layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction).

Traditionally we had to use HTML tables and floats for creating page layouts but these days we can use a combination of Flexbox and Grid for layouts.

In the early days of CSS the possibilities for laying things out were limited and for that reason the `table` tag was often used for page layout (`<table role="presentation">`). Next the CSS `display` property became more widely used setting `display: inline-block` with negative margins etc. 

The next step was using [floats](https://developer.mozilla.org/en-US/docs/Web/CSS/float). Using floats was also tricky because the containing element could be smaller than the floated element making the floated element float outside it's bounding container. 

In 2017 Flexbox became a CSS module with the goal of laying out and distributing space between or around items an a container. For the first time there was a powerful way to do one dimensional layouts in CSS. See MDN for a [tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) or to read up on the [basic concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox).


#### Layout Resources

- [Learn Layout](https://learnlayout.com/)
- [CSS Tricks Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Free Codecamp's CSS Flexbox Handbook](https://www.freecodecamp.org/news/the-css-flexbox-handbook/) with practical examples
- [MDN - Realizing Common Layouts using Grids](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Realizing_common_layouts_using_grids)
- [Grid By Example](https://gridbyexample.com/)

## Browser Default Styles

Browsers have default styles that they will apply to rendered documents. A **reset stylesheet** is some CSS that will try to eliminate these inconsistencies between browsers by removing default margins, paddings, sizes etc.  These days you often see sites doing some minimal version of this like in the sample below. Another option is to use something like [normalize.css](https://necolas.github.io/normalize.css/).

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

## Writing Approaches

There is basically two ways to think of how to write CSS. The traditional way of writing semantic CSS classes and a new way often referred to as **utility-first classes** based CSS where the [Tailwind CSS](https://tailwindcss.com/)  framework has become very popular. Writing semantic style CSS often start to crumble as a project grows. Another approach could be something like [Styled Components](https://styled-components.com/).


## CSS Architecture

Block Element Modifier or [BEM](https://getbem.com/introduction/) is a design methodology that helps create reusable components and code sharing. In larger projects how we name and organize our CSS will make a huge difference. Other methodologies OOCSS, [SMACSS](https://smacss.com/), [SUITCSS](https://suitcss.github.io/), [Atomic](https://acss-io.github.io/atomizer/).

BEM Breaks down elements to *blocks*, *elements*, and *modifiers*. A block is a stadalone entity useful on its own like (container, header, menu, input, checkbox). An element is a part of a block with no standalone meaning like (menu item, list item, header title). A modifier is a flag on a block or an element like (disabled, highlighhted, checked, big). Naming will then be done using the following pattern: `.block__element--modifier`. Example:

```css
.form {}
.form__input {}
.form__input--large {}
.form__input--disabled {}
```

## CSS Language Extensions

To overcome some of the limitations of CSS a number of tools and extensions have emerged over the years. Among the more popular are [Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/), [Less](http://lesscss.org/), [PostCSS](https://postcss.org/) and [Stylus](http://learnboost.github.io/stylus/)


## More Resources

### References

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [W3Schools CSS Reference](http://www.w3schools.com/cssref/)
- [Codrops CSS Reference](http://tympanus.net/codrops/css_reference/)
- [CSS Cheat Sheet](http://lesliefranke.com/files/reference/csscheatsheet.html)

### Video Training

- [Frontend Masters CSS Learning Path](https://frontendmasters.com/learn/css/)
- [Kevin Powell's YouTube Channel](https://www.youtube.com/@KevinPowell/videos)
- [Jen Simmons](http://labs.jensimmons.com/) - [Layout Land](https://www.youtube.com/layoutland) YouTube Channel

### Books

- [CSS Secrets](https://www.amazon.com/gp/product/1449372635): Better Solutions to Everyday Web Design Problems by Lea Verou
- [CSS in 44 minutes](https://jgthms.com/css-in-44-minutes-ebook)
