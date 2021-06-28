/**
 * @module ol/format/XML
 */
import {isDocument, parse} from '../xml.js';
import {Node} from '../nodeTypes.js';

/**
 * @classdesc
 * Generic format for reading non-feature XML data
 *
 * @abstract
 */
class XML {
  /**
   * Read the source document.
   *
   * @param {any} source The XML source.
   * @return {Object} An object representing the source.
   * @api
   */
  read(source) {
    if (!source) {
      return null;
    } else if (typeof source === 'string') {
      const doc = parse(source);
      return this.readFromDocument(doc);
    } else if (isDocument(source)) {
      return this.readFromDocument(source);
    } else {
      return this.readFromNode(source);
    }
  }

  /**
   * @param {any} doc Document.
   * @return {Object} Object
   */
  readFromDocument(doc) {
    for (let n = doc.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        return this.readFromNode(/** @type {any} */ (n));
      }
    }
    return null;
  }

  /**
   * @abstract
   * @param {any} node Node.
   * @return {Object} Object
   */
  readFromNode(node) {}
}

export default XML;
