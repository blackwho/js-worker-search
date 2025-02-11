/** @flow */

/**
 * Maps search tokens to uids using a trie structure.
 */
export default class SearchIndex {
  tokenToUidMap: { [token: string]: any };

  constructor() {
    this.tokenToUidMap = {};
  }

  /**
   * Maps the specified token to a uid.
   *
   * @param token Searchable token (e.g. "road")
   * @param uid Identifies a document within the searchable corpus
   */
  indexDocument(token: string, uid: any): void {
    if (!this.tokenToUidMap[token]) {
      this.tokenToUidMap[token] = [];
    }
    this.tokenToUidMap[token].push(uid);
  }

  /**
   * Finds uids that have been mapped to the set of tokens specified.
   * Only uids that have been mapped to all tokens will be returned.
   *
   * @param tokens Array of searchable tokens (e.g. ["long", "road"])
   * @return Array of uids that have been associated with the set of search tokens
   */
  search(tokens: Array<string>): Array<any> {
    let uidArr: Array<any> = [];
    tokens.forEach(token => {
      uidArr = uidArr.concat(this.tokenToUidMap[token] || []);
    });

    return uidArr;
  }
}
