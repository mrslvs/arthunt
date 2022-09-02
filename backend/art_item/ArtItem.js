'use strict';
const crypto = require('crypto');

class ArtItem {
    #id;
    #name;
    #author;
    #type;
    #imageURL;
    #image;
    #height;
    #width;
    #searchPhrase;
    #code;
    #found;

    constructor(name, author, type, imageURL, image, height, width, code) {
        this.#id = crypto.randomUUID();
        this.#name = name;
        this.#author = author;
        this.#type = type;
        this.#imageURL = imageURL;
        this.#image = image;
        this.#height = height;
        this.#width = width;
        this.#searchPhrase =
            'Here comes the search phrase once obtained from organizer.';
        this.#code = code;
        this.#found = false;
    }

    // ==== GETERS ====

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getAuthor() {
        return this.#author;
    }

    getType() {
        return this.#type;
    }

    getImageURL() {
        return this.#imageURL;
    }

    getImage() {
        return this.#image;
    }

    getHeight() {
        return this.#height;
    }

    getWidth() {
        return this.#width;
    }

    getSearchPhrase() {
        return this.#searchPhrase;
    }

    getCode() {
        return this.#code;
    }

    getFound() {
        return this.#found;
    }

    // ==== SETTERS ====

    setName(name) {
        this.#name = name;
    }

    setAuthor(author) {
        this.#author = author;
    }

    setType(type) {
        this.#type = type;
    }

    setImageURL(imgSrc) {
        this.#imageURL = imgSrc;
    }

    setImage(imgPath) {
        this.#image = imgPath;
    }

    setHeight(height) {
        this.#height = height;
    }

    setWidth(width) {
        this.#width = width;
    }

    setSearchPhrase(searchPhrase) {
        this.#searchPhrase = searchPhrase;
    }

    setCode(code) {
        this.#code = code;
    }

    markAsFound() {
        this.#found = true;
    }

    // ==== METHODS ====

    isCodeEqual(code) {
        if (code === this.#code) {
            return true;
        } else {
            return false;
        }
    }

    persistQueryValues() {
        return `
            '${this.#name}', 
            '${this.#author}', 
            '${this.#type}', 
            '${this.#imageURL}', 
            '${this.#image}', 
            ${this.#height}, 
            ${this.#width}, 
            '${this.#searchPhrase}', 
            '${this.#code}', 
            ${this.#found}
        `;
    }

    getEventData() {
        const name = this.#name;
        const searchPhrase = this.#searchPhrase;
        const code = this.#code;

        const tmp = {
            name,
            searchPhrase,
            code,
        };

        return tmp;
    }

    getPublicData() {
        const id = this.#id;
        const name = this.#name;
        const author = this.#author;
        const type = this.#type;
        const imageURL = this.#imageURL;
        const image = this.#image;
        const height = this.#height;
        const width = this.#width;
        const searchPhrase = this.#searchPhrase;
        const found = this.#found;

        const tmp = {
            id,
            name,
            author,
            type,
            imageURL,
            image,
            height,
            width,
            searchPhrase,
            found,
        };

        return tmp;
    }
}

module.exports = ArtItem;
