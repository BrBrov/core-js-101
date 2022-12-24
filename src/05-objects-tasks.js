/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  // throw new Error('Not implemented');
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  // throw new Error('Not implemented');
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  // throw new Error('Not implemented');
  return Object.setPrototypeOf(JSON.parse(json), proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  css: '',
  ctrl: false,
  elem: false,
  ident: false,
  pseudoEl: false,
  canCreatePseudo: false,
  sequenceСontrol: 0,
  returner(value) {
    if (this.ctrl) {
      this.css += value;
      return this;
    }
    const newObj = { ...this };
    newObj.css += value;
    newObj.ctrl = true;
    this.elem = false;
    this.ident = false;
    this.pseudoEl = false;
    this.canCreatePseudo = false;
    this.sequenceСontrol = 0;
    return newObj;
  },
  element(value) {
    // throw new Error('Not implemented');
    if (this.elem) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.sequenceСontrol !== 0) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 1;
    this.elem = true;
    this.canCreatePseudo = true;
    return this.returner(value);
  },

  id(value) {
    // throw new Error('Not implemented');
    if (this.ident) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.sequenceСontrol > 1) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 2;
    this.ident = true;
    this.canCreatePseudo = true;
    const val = `#${value}`;
    return this.returner(val);
  },

  class(value) {
    // throw new Error('Not implemented');
    if (this.sequenceСontrol > 3) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 3;
    this.canCreatePseudo = true;
    const val = `.${value}`;
    return this.returner(val);
  },

  attr(value) {
    // throw new Error('Not implemented');
    if (this.sequenceСontrol > 4) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 4;
    this.canCreatePseudo = true;
    const val = `[${value}]`;
    return this.returner(val);
  },

  pseudoClass(value) {
    // throw new Error('Not implemented');
    if (this.sequenceСontrol > 5) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 5;
    const val = `:${value}`;
    return this.returner(val);
  },

  pseudoElement(value) {
    // throw new Error('Not implemented');
    if (this.pseudoEl) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.sequenceСontrol > 6) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.sequenceСontrol = 6;
    this.pseudoEl = true;
    const val = `::${value}`;
    return this.returner(val);
  },

  combine(selector1, combinator, selector2) {
    // throw new Error('Not implemented');
    const value = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    return this.returner(value);
  },
  stringify() {
    return this.css;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
